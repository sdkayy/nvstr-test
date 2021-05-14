import React, { useEffect, useState } from "react";
import "./PortfolioSummary.css";
import { ServerMock } from "utils/ServerMock";
import { numToReadableDollar, percentToReadable } from "utils/utils";
import { RefreshSpinner, Spinner } from "components/loader/spinner";

// This feels really messy. I'm not entirely sure if I have everything the best it should be data fetching wise.
// For some reason I can't get it to feel not ugly. Also to note, given more time I would probably introduce a skeleton loading
// type of loading for initial and refreshes as I think it looks better.
// extraTickers are the two ids we want to display, we will pull them from the stock data
function PortfolioSummary({ extraTickers }) {
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState(null);
  const [portfolioValue, setPortfolioValue] = useState(null);
  const [featuredTickerData, setFeaturedTickerData] = useState([]);
  // Kinda divided myself on isError and doing generic messages, all up to more decisions than just mine IMO, do we want ppl to report issues
  // with more details or report vauge issues etc.
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(true);

  // Lets grab all stocks we own and any cash we have
  useEffect(() => {
    // Not the best to have nested promises but I don't see this getting out of control as the functionality is complete
    if (isRefreshing) {
      ServerMock.getPortfolio()
        .then((portfolio) => {
          if (portfolio.status === 200) {
            ServerMock.getEquity()
              .then((equity) => {
                if (equity.status === 200) {
                  setPortfolioData({
                    securities: portfolio.data,
                    equity: equity.data.cash,
                  });
                } else {
                  setIsLoading(false);
                  setError("API Error: " + equity.error);
                }
              })
              .catch((err) => {
                setIsLoading(false);
                setError("API Error: " + err);
              });
          } else {
            setIsLoading(false);
            setError("API Error: " + portfolio.error);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setError("API Error: " + err);
        });
    }
  }, [isRefreshing]);

  // Lets grab all prices, and do our computations for changes and grab some extraTicker data, this is the heart of the function
  useEffect(() => {
    if (!!portfolioData) {
      ServerMock.getSecurityPrices(portfolioData.securities.map((i) => i.id))
        .then((pricingResp) => {
          if (pricingResp.status === 200) {
            const currentPortfolioValue = portfolioData?.securities
              ?.map((stock) => {
                const stockData = pricingResp.data[stock.id];
                return stock.shares * stockData.current_price;
              })
              .reduce((a, b) => a + b, portfolioData.equity);
            const previousCloseValue = portfolioData?.securities
              ?.map((stock) => {
                const stockData = pricingResp.data[stock.id];
                return stock.shares * stockData.prev_close_price;
              })
              .reduce((a, b) => a + b, portfolioData.equity);
            const previousChange = currentPortfolioValue - previousCloseValue;

            setPortfolioValue({
              currentPortfolioValue,
              previousChange: {
                value: previousChange,
                percent: percentToReadable(
                  (previousChange / previousCloseValue) * 100
                ),
              },
            });
            setFeaturedTickerData(
              extraTickers?.map((t) => pricingResp.data[t])
            );
          } else {
            setError("API Error: " + pricingResp.error);
            setIsLoading(false);
          }
        })
        .then(() => {
          setIsLoading(false);
          setIsRefreshing(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setError("API Error: " + err);
        });
    }
  }, [portfolioData]);

  if (isLoading || !!error) {
    return (
      <div className="portfolio-summary-loading-error">
        {isLoading ? (
          <Spinner />
        ) : (
          <p
            style={{
              color: "red",
              fontSize: "12px",
              textTransform: "uppercase",
              opacity: 0.4,
            }}
          >
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className="portfolio-summary-container"
      style={{ position: "relative" }}
    >
      <a
        style={{ position: "absolute", top: "-6px", right: "-6px" }}
        onClick={() => {
          setIsRefreshing(true);
        }}
      >
        <RefreshSpinner size={16} isRefreshing={isRefreshing} />
      </a>
      <div className={"data-section"}>
        <div>
          <p style={{ fontSize: "12px" }}>Portfolio Value</p>
          <h2 style={{ fontSize: "24px", marginTop: "6px" }}>
            {numToReadableDollar(portfolioValue.currentPortfolioValue, false)}
          </h2>
        </div>
        <div style={{ flex: 1 }} />
        <div
          className={`
          arrow
          ${
            portfolioValue.previousChange.value > 0
              ? "up"
              : portfolioValue.previousChange.value < 0
              ? "down"
              : "right"
          }`}
        />
        <div
          style={{
            marginLeft: "12px",
            color:
              portfolioValue.previousChange.value > 0
                ? "green"
                : portfolioValue.previousChange.value < 0
                ? "red"
                : "gray",
            textAlign: "end",
            fontSize: "14px",
          }}
        >
          <p>{numToReadableDollar(portfolioValue.previousChange.value)}</p>
          <p style={{ marginTop: "6px" }}>
            {portfolioValue.previousChange.percent}
          </p>
        </div>
      </div>
      <div className={"extra-tickers"}>
        {featuredTickerData?.map((ticker) => (
          <div key={ticker.id} className={"ticker-group"}>
            <p style={{ fontSize: "10px", fontWeight: "bold" }}>
              {ticker.name} ({ticker.symbol})
            </p>
            <div
              className={`arrow-small ${
                ticker.current_price_change_percent > 0
                  ? "up"
                  : ticker.current_price_change_percent < 0
                  ? "down"
                  : "right"
              }`}
              style={{ margin: "0px 4px" }}
            />
            <p
              style={{
                fontSize: "10px",
                color:
                  ticker.current_price_change_percent > 0
                    ? "green"
                    : ticker.current_price_change_percent < 0
                    ? "red"
                    : "gray",
              }}
            >
              {percentToReadable(ticker.current_price_change_percent)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PortfolioSummary;
