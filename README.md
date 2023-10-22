# ETHONLINE 2023 : JINDO

JINDO: Transforming Lending Protocols' UX by offering clear profit/loss insights with detailed asset comparison reports. Simplify your DeFi experience. #DeFi #JINDO #UX

# thegraph api

Code detail  
Frontend/Backend/functions/index.js

Best use of Subgraph or Substream

Why was it used?

Our project's goal is to offer users a service that displays their real-time profit and loss based on their initial position.   
So, we need to retrieve data from the time when the user first took a position and subsequent snapshots.  

Source Index : Spark Lend Ethereum  
https://thegraph.com/explorer/subgraphs/GbKdmBe4ycCYCQLQSjqGg6UHYoYfbyJyq5WrG35pv1si?view=Overview&chain=arbitrum-one

source code example for using graphQL

```await axios({
  url: 'https://gateway-arbitrum.network.thegraph.com/api/{API-KEY}/subgraphs/id/GbKdmBe4ycCYCQLQSjqGg6UHYoYfbyJyq5WrG35pv1si',
  method: 'post',
  data: {
    query: `
    {
      account(id: "${addr}") {
        id
        openPositionCount
        positionCount
        positions {
          balance
          id
          side
          hashClosed
          hashOpened
          timestampClosed
          timestampOpened
          snapshots {
            balanceUSD
            balance
          }
          asset {
              symbol
              decimals
            }
        }
      }
    }           
    `
  }
```

# Spark Protocol

In the Spark protocol, we primarily used it at the level of loading data through APIs.  
However, there was a proposal for a new UI/UX for the users, so we incorporated that as an addition.

# how to start code

npm start

