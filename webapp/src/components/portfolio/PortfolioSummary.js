import React from 'react';
import './PortfolioSummary.css';
import { ServerMock } from 'securitiesservermock/ServerMock'

function PortfolioSummary() {
    const [state, setState] = React.useState({})

    React.useEffect(() => {
       ServerMock.getAllSecurities().then(resp => setState(resp))
    },[])
    return (
        <div className="portfolio-summary-container">
            Start building here!

            <div>
                {
                    JSON.stringify(state)
                }
            </div>
        </div>
    );
}

export default PortfolioSummary;
