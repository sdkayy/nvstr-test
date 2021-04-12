# Nvstr Frontend Engineer Candidate Project

As a Frontend Engineer at Nvstr, you’ll be part of a team maintaining and adding to our customer-facing web and mobile applications.

We’d like you to complete a small project to demonstrate your skills in writing well-styled, clear, efficient, reusable frontend components. For this project you’ll create a UI component that will display some mock portfolio data.

You can choose to code this project in React or React Native, whichever you feel most comfortable with, and you may use any additional tools or technologies.

We expect you to spend roughly 2-4 hours total on the project.

Component Requirements:
- Component should have a Portfolio Value display, and a Day Change display side by side
- Component should have a Market Overview display that can render any 2 stocks side by side
- Components should have a loading state for the time delay for getting the initial data
- Day change amounts should be colored (green if positive, grey if 0, red if negative)
- All amounts should be styled as USD currency
- Percentages should be rounded to the hundredths place
- Data for the components will be provided within a utility class to mock sending requests to an API. See project readme its API for details.
- Include a styled refresh mechanism to get the latest data using a React Native component (RefreshControl) or “Refresh” button (your choice), be sure to reflect the updating state in some way
- Feel free to add any of your own touches or ideas as you build


# Data API

I have created a class to provide you data like a server might.

### Methods:

    import { ServerMock } from 'utils/ServerMock';

    ServerMock.getAllSecurities // returns a Promise that resolves to an array of all securities (stocks) supported in the mock server

        [
            { id: 1, name: 'Apple Inc.', symbol: 'AAPL' },
            ...
        ]

    ServerMock.getEquity // returns a Promise that resolves to an object with current user's equity data

        { cash: 3255.23 }

    ServerMock.getPortfolio // returns a Promise that resolves to an array of portfolio securities (stocks)

        [
            { id: 1, name: 'Apple Inc.', symbol: 'AAPL', shares: 4, cost_basis: 102.24 },
            ...
        ]

    ServerMock.getSecurityPrices // returns a Promise that resolves to a lookup security (stock) pricing data

        {
            1: { id: 1, name: 'Apple Inc.', symbol: 'AAPL', current_price: 122.42, current_price_change: 1.12, current_price_change_percent: .0087, },
            ...
        }

### Jargon:
cost_basis = average price the shares of the stock were purchased at
security/securities = stock/s
