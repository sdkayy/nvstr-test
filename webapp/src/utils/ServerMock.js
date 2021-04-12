const roll = (odds) => {
    const value = Math.random();
    return value <= odds;
}

class _ServerMock {

    constructor () {
        this._latencyBase = 750;

        this._securitiesLookup = {
            1: { id: 1, name: 'Apple Inc.', symbol: 'AAPL' },
            2: { id: 2, name: 'Visa Inc.', symbol: 'V' },
            3: { id: 3, name: 'Microsoft Corporation', symbol: 'MSFT' },
            4: { id: 4, name: 'Zero Company', symbol: 'ZERO' },
            5: { id: 5, name: 'S&P 500', symbol: 'SPY' },
            6: { id: 6, name: 'NASDAQ 100', symbol: 'QQQ' },
        }
        this._sharesLookup = {
            1: 4,
            2: 6,
            3: 3,
            4: 20,
        }
        this._costBasisLookup = {
            1: 75.23,
            2: 180.24,
            3: 99.23,
            4: 100.30,
        }
        this._openPriceLookup = {
            1: 128.23,
            2: 220.23,
            3: 252.83,
            4: 100.30,
            5: 404.24,
            6: 333.33,
        }
        this._prevClosePriceLookup = {
            1: 133.23,
            2: 205.23,
            3: 245.83,
            4: 100.30,
            5: 402.24,
            6: 331.33,
        }
        this._prevPriceGivenCache = {}

        this._cash =  3255.23;
        this._pendingCash =  15000;
        this._userId = 13;
    }

    getEquity = () => {
        const data = {
            cash: this._cash
            // pendingCash: this._pendingCash
        };
        return this._buildAPIResponse(data);
    }

    getPortfolio = () => {
        const ids = Object.keys(this._securitiesLookup).filter(id => Math.abs(this._getShares(id)) > 0);
        const data = ids.map(id => this._buildSecurityPortfolioData(id));
        return this._buildAPIResponse(data);
    }

    getAllSecurities = () => {
        const ids = Object.keys(this._securitiesLookup);
        const data = ids.map(id => this._securitiesLookup[id]);
        return this._buildAPIResponse(data);
    }

    getSecurityPrices = (ids) => {
        if (!Array.isArray(ids))
            return this._buildAPIErrorResponse('Ids param must be an array');

        const data = {};
        ids.forEach(id => {
            if (!this._securitiesLookup[id])
                return null;

            data[id] = this._buildCurrentPriceData(id)
        })
        return this._buildAPIResponse(data);
    }

    _calculateCurrentPrice = id => {
        const openPrice = this._getOpenPrice(id);
        const lastPrice = this._getLastPrice(id);
        const basePrice = lastPrice !== null ? lastPrice : openPrice;
        const upMove = roll(0.5);
        const changePercentValue = (Math.random() * (3)) / 1000 * (upMove ? 1 : -1);
        const currentPrice = basePrice + basePrice * changePercentValue;
        this._storeGivenPrice(id, currentPrice);
        return currentPrice;
    }

    _storeGivenPrice = (id, price) => this._prevPriceGivenCache[id] = price;

    _calculateDayChangeAndPercent = (id, currentPrice) => {
        const prevClosePrice = this._getPrevClosePrice(id);
        const value = currentPrice - prevClosePrice;
        const percent = value / prevClosePrice;
        return {
            value,
            percent,
        }
    }

    _getSecurityData = id => this._securitiesLookup[id] || null;
    _getOpenPrice = id => this._openPriceLookup[id] || null;
    _getPrevClosePrice = id => this._prevClosePriceLookup[id] || null;
    _getShares = id => this._sharesLookup[id] || null;
    _getCostBasis = id => this._costBasisLookup[id] || null;
    _getLastPrice = id => this._prevPriceGivenCache[id] || null;

    _buildCurrentPriceData = (id) => {
        if (!this._securitiesLookup[id])
            return null;

        const currentPrice = this._calculateCurrentPrice(id);
        const {
            value: currentPriceChange,
            percent: currentPriceChangePercent
        } = this._calculateDayChangeAndPercent(id, currentPrice);

        return {
            ...this._getSecurityData(id),

            open_price: this._formatPrice(this._openPriceLookup[id]),
            prev_close_price: this._formatPrice(this._prevClosePriceLookup[id]),

            current_price: this._formatPrice(currentPrice),
            current_price_change: this._formatFloat(currentPriceChange),
            current_price_change_percent: this._formatFloat(currentPriceChangePercent),
        }
    };

    _formatPrice = f => parseFloat(f.toFixed(2));

    _formatFloat = f => parseFloat(f.toFixed(4));

    _buildSecurityPortfolioData = id => {
        if (!this._securitiesLookup[id])
            return null;

        return {
            ...this._getSecurityData(id),
            shares: this._getShares(id) || 0,
            cost_basis: this._getCostBasis(id) || null,
        }
    }

    _buildAPIResponse = data => {
        return new Promise((res, rej) => setTimeout(() => res({ status: 200, data }), this._latencyBase));
    }

    _buildAPIErrorResponse = errorMessage => {
        return new Promise((res, rej) => setTimeout(() => res({ status: 400, error: errorMessage }), 1));
    }
}

export const ServerMock = new _ServerMock();
