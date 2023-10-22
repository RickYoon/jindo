const Web3 = require('web3');
const axios = require("axios");
// const ethLendingApr = require("./ethLendAPR.json")

const projectId = '9fb8df225ae64fca8b35dde137c918fc';
const infuraUrl = 'https://mainnet.infura.io/v3/' + projectId;

const contractABI = [
    {
        "constant": true,
        "inputs": [{"name": "_owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "balance", "type": "uint256"}],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "latestAnswer",
        "outputs": [{"name": "price", "type": "uint256"}],
        "type": "function"
    }
];

async function getETHLendingData (addr) {

    const web3 = new Web3(infuraUrl); 
    const contractAddress = '0x59cD1C87501baa753d0B5B5Ab5D8416A45cD71DB';
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    const userLending = await contract.methods.balanceOf(addr).call();
    
    return Number(userLending) / 1e+18
}

async function getDaiBorrowData (addr) {

    const web3 = new Web3(infuraUrl); 
    const contractAddress = '0xf705d2B7e92B3F38e6ae7afaDAA2fEE110fE5914';
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    const userBorrow = await contract.methods.balanceOf(addr).call();
    
    return Number(userBorrow) / 1e+18
}

async function getETHprice () {

    const web3 = new Web3(infuraUrl); 
    const contractAddress = '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419';
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    const ethPrice = await contract.methods.latestAnswer().call();
    
    return Number(ethPrice) / 1e+8
}

async function getDAIprice () {

    const web3 = new Web3(infuraUrl); 
    const contractAddress = '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9';
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    const ethPrice = await contract.methods.latestAnswer().call();
    
    return Number(ethPrice) / 1e+8
}

async function getUserData() {
    try {

        const historyData = await getHistorydata("0x2a0b0bdbe9c2947edd263f5bc43b75f6a2b27f81")

        const ethLending = await getETHLendingData("0x2a0b0bdbe9c2947edd263f5bc43b75f6a2b27f81")
        const daiBorrow = await getDaiBorrowData("0x2a0b0bdbe9c2947edd263f5bc43b75f6a2b27f81")
        const ethPrice = await getETHprice()
        const daiPrice = await getDAIprice()
        
        const currentData ={
            ethLending : ethLending,
            daiBorrow : daiBorrow,
            ethPrice : ethPrice,
            daiPrice : daiPrice
        }

        const assets = await parsingPositions(historyData, currentData)  

        return assets;

    } catch (error) {
        console.log(error)
    }
}

async function getAPRDays() {
    try {
        // console.log("here")
        let tvl = await axios({
            url: 'https://gateway-arbitrum.network.thegraph.com/api/5ba4c079d3a177427cf85acca89883fb/subgraphs/id/GbKdmBe4ycCYCQLQSjqGg6UHYoYfbyJyq5WrG35pv1si',
            method: 'post',
            data: {
              query: `
              {
                marketDailySnapshots {
                  days
                  timestamp
                }
              }         
              `
            }
          }).then((result) => {
            //   console.log("result",result.data.data.tokens)
              return result
          });          
          return tvl
    } catch (error) {
        console.log(error)
    }
}

async function getAPRtrend() {
    try {
        // console.log("here")
        let tvl = await axios({
            url: 'https://gateway-arbitrum.network.thegraph.com/api/5ba4c079d3a177427cf85acca89883fb/subgraphs/id/GbKdmBe4ycCYCQLQSjqGg6UHYoYfbyJyq5WrG35pv1si',
            method: 'post',
            data: {
              query: `
              {
                interestRates(
                  where: {id_gt: "LENDER-VARIABLE-0x59cd1c87501baa753d0b5b5ab5d8416a45cd71db"}
                ) {
                  id
                  rate
                  side
                }
              }          
              `
            }
          }).then((result) => {
            //   console.log("result",result.data.data.tokens)
              return result
          });          
          return tvl
    } catch (error) {
        console.log(error)
    }
}


async function getHistorydata(addr) {
    try {
        // console.log("here")
        let tvl = await axios({
            url: 'https://gateway-arbitrum.network.thegraph.com/api/5ba4c079d3a177427cf85acca89883fb/subgraphs/id/GbKdmBe4ycCYCQLQSjqGg6UHYoYfbyJyq5WrG35pv1si',
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
                      lastPriceUSD
                      name
                      symbol
                      decimals
                      id
                    }
                  }
                }
              }           
              `
            }
          }).then((result) => {
            //   console.log("result",result.data.data.tokens)
              return result
          });          
          return tvl
    } catch (error) {
        console.log(error)
    }
}

async function parsingPositions(refData, currentData) {

    let total = {
        totalBalance : 0,
        positionPnlUSD : 0,
        positionPnlPercent : 0
    }

    let lending = []

    let borrow = []

    console.log("refData",refData)

    refData.data.data.account.positions.map((res)=>{
        if(res.side === "BORROWER"){

            var currentDate = new Date();
            var timestamp = res.timestampOpened * 1000;
            var timeDifference = currentDate - timestamp;

            // 밀리초를 다른 형식으로 변환 (예: 초, 분, 시간)
            var seconds = Math.floor(timeDifference / 1000); // 초
            var minutes = Math.floor(seconds / 60); // 분
            var hours = Math.floor(minutes / 60); // 시간
            var days = Math.floor(hours / 24); // 일

            borrow.push({
                tokenName : res.asset.symbol,
                lendingDate : new Date(res.timestampOpened * 1000),
                lendingDays : days,                
                closeLendingDate : res.timestampClosed ? new Date(res.timestampClosed * 1000) : 0,
                amountInitial : Number(res.balance) / Math.pow(10,res.asset.decimals),
                priceInitial : res.snapshots[0].balanceUSD / (Number(res.balance) / Math.pow(10,res.asset.decimals)),
                valueInitial : Number(res.snapshots[0].balanceUSD),
                amountNow : currentData.daiBorrow,
                priceNow : currentData.daiPrice,
                valueNow : currentData.daiBorrow * currentData.daiPrice,
                amountDiff : currentData.daiBorrow - Number(res.balance) / Math.pow(10,res.asset.decimals),
                priceDiff : currentData.daiPrice - res.snapshots[0].balanceUSD / (Number(res.balance) / Math.pow(10,res.asset.decimals)),
                valueDiff : (currentData.daiBorrow * currentData.daiPrice) - Number(res.snapshots[0].balanceUSD)
            })
        } else {

            var currentDate = new Date();
            var timestamp = res.timestampOpened * 1000;
            var timeDifference = currentDate - timestamp;

            // 밀리초를 다른 형식으로 변환 (예: 초, 분, 시간)
            var seconds = Math.floor(timeDifference / 1000); // 초
            var minutes = Math.floor(seconds / 60); // 분
            var hours = Math.floor(minutes / 60); // 시간
            var days = Math.floor(hours / 24); // 일

            // var getAPRChart = 

            lending.push({
                tokenName : res.asset.symbol,
                lendingDate : new Date(res.timestampOpened * 1000),
                lendingDays : days,                
                closeLendingDate : res.timestampClosed ? new Date(res.timestampClosed * 1000) : 0,
                amountInitial : Number(res.balance) / Math.pow(10,res.asset.decimals),
                priceInitial : res.snapshots[0].balanceUSD / (Number(res.balance) / Math.pow(10,res.asset.decimals)),
                valueInitial : Number(res.snapshots[0].balanceUSD),
                amountNow : currentData.ethLending,
                priceNow : currentData.ethPrice,
                valueNow : currentData.ethLending * currentData.ethPrice,
                amountDiff : currentData.ethLending - Number(res.balance) / Math.pow(10,res.asset.decimals),
                priceDiff : currentData.ethPrice - res.snapshots[0].balanceUSD / (Number(res.balance) / Math.pow(10,res.asset.decimals)),
                valueDiff : (currentData.ethLending * currentData.ethPrice) - Number(res.snapshots[0].balanceUSD),
                type : res.side,
                assetId : res.id.split("-")[1],
                rawId : res.id,
                txHash : res.hashOpened,
                // aprTrend : ethLendingApr
                // aprTrend: [
                //     { 
                //       date: [],
                //       data: []
                //     }
                //   ]
            })
        }
    })
    // console.log("borrow",borrow)
    // console.log("lending",lending)

    return {
        totalBalance : 2072,
        positionPnlUSD : 123,
        positionPnlPercent : 10.2,
        Lending : lending,
        Borrowing : borrow
    }

}

// getLendingData()


module.exports = { getUserData };



// openTimeStamp : new Date(res.timestampOpened * 1000),
// closeTimeStamp : res.timestampClosed ? new Date(res.timestampClosed * 1000) : 0,
// type : res.side,
// assetId : res.id.split("-")[1],
// rawId : res.id,
// txHash : res.hashOpened,
// amount : res.balance,
// balanceUSD : res.snapshots[0].balanceUSD,
// tokenDecimals : res.asset.decimals,
// tokenSymbol : res.asset.symbol,
// transAmount : Number(res.balance) / Math.pow(10,res.asset.decimals),
// snapTokenPrice : res.snapshots[0].balanceUSD / (Number(res.balance) / Math.pow(10,res.asset.decimals))


// query MyQuery {
//     interestRates(
//       where: {id_gt: "LENDER-VARIABLE-0x59cd1c87501baa753d0b5b5ab5d8416a45cd71db"}
//     ) {
//       id
//       rate
//       side
//     }
//   }

// BORROWER-VARIABLE-0x59cd1c87501baa753d0b5b5ab5d8416a45cd71db

// {
//     interestRates(
//       where: {id_gt: "BORROWER-VARIABLE-0x59cd1c87501baa753d0b5b5ab5d8416a45cd71db"}
//     ) {
//       id
//       rate
//       side
//     }
//   }


// {
//     interestRates(
//       where: {id_gt: "BORROWER-VARIABLE-0x59cd1c87501baa753d0b5b5ab5d8416a45cd71db"}
//     ) {
//       id
//       rate
//       side
//     }
//   }

    // const deposit = [
    //     {
    //       "amountUSD": "4447.52",
    //       "timestamp": "1694433119",
    //       "id": "0x0fa5dcf1a222abcfaee14be0d550f89a0f3772c4694a4b5b2f7027cdb6ba01b91001000000000000",
    //       "amount": "2800000000000000000",
    //       "blockNumber": "18112933",
    //       "gasLimit": "301615",
    //       "gasPrice": "14643722859",
    //       "gasUsed": "204466",
    //       "hash": "0x0fa5dcf1a222abcfaee14be0d550f89a0f3772c4694a4b5b2f7027cdb6ba01b9",
    //       "logIndex": 272,
    //       "nonce": "16"
    //     }
    //   ]

    //   lending.map((res,i)=>{
    //     const moneyInfo = deposit.filter(obj => obj.hash === res.txHash);
    //     // lending[i]["amountUSD"]=moneyInfo[0].amountUSD
    //     // lending[i]["amountUSD"]=moneyInfo[0].amountUSD
    //   })
      

    // days to timestamp
    //   query MyQuery {
    //     marketDailySnapshots {
    //       days
    //       timestamp
    //     }
    //   }

    // // rate day by day
    // // query MyQuery {
    // //     interestRates(
    // //       where: {id_gt: "LENDER-VARIABLE-0x59cd1c87501baa753d0b5b5ab5d8416a45cd71db"}
    // //       orderBy: maturityBlock
    // //     ) {
    // //       id
    // //       rate
    // //       side
    // //       type
    // //     }
    // //   }

    // // "tokenName": "ETH",
    // // "tokenAmount": 21,
    // // "tokenPrice": 123,
    // // "totalBalanceUSD": 1231

    // // query MyQuery {
    // //     interestRates(
    // //       where: {id_gt: "LENDER-VARIABLE-0x59cd1c87501baa753d0b5b5ab5d8416a45cd71db"}
    // //     ) {
    // //       id
    // //       rate
    // //       side
    // //     }
    // //   }


    // // query MyQuery {
    // //     interestRates(
    // //       where: {id: "LENDER-VARIABLE-0x59cd1c87501baa753d0b5b5ab5d8416a45cd71db"}
    // //       orderBy: maturityBlock
    // //     ) {
    // //       id
    // //       rate
    // //       side
    // //       type
    // //       maturityBlock
    // //       tranche
    // //       duration
    // //     }
    // //   }

    // // query MyQuery {
    // //     interestRates(
    // //       where: {id: "BORROWER-VARIABLE-0x59cd1c87501baa753d0b5b5ab5d8416a45cd71db"}
    // //       orderBy: maturityBlock
    // //     ) {
    // //       id
    // //       rate
    // //       side
    // //       type
    // //       maturityBlock
    // //       tranche
    // //       duration
    // //     }
    // //   }

    // // 0x2a0b0bdbe9c2947edd263f5bc43b75f6a2b27f81-0x4dedf26112b3ec8ec46e7e31ea5e123490b05b8b-BORROWER-VARIABLE-0

    // // console.log("borrow",borrow)



    // const trend = await getAPRtrend()
    // // console.log("trend",trend.data.data.interestRates)

    // trend.data.data.interestRates.forEach((item) => {
    //     const match = item.id.match(/\d{5}$/); // Use regular expression to match the last 5 digits
    //     if (match) {
    //       item.id = match[0]; // Update 'id' with the matched value
    //     }
    //   });
      
    // const daysTimestamp = await getAPRDays()
    // // console.log("daysTimestamp",daysTimestamp.data.data.marketDailySnapshots)

    // const convertedData = daysTimestamp.data.data.marketDailySnapshots.map(item => {
    //     // Convert 'timestamp' to a Date object
    //     const timestamp = new Date(parseInt(item.timestamp) * 1000); // Multiply by 1000 to convert from seconds to milliseconds
      
    //     return {
    //       days: item.days,
    //       timestamp: timestamp
    //     };
    //   });
      
    // //   console.log(trend.data.data.interestRates);
    // //   console.log(convertedData);

    //   trend.data.data.interestRates.forEach((aObj) => {
    //     convertedData.forEach((bObj) => {
    //       if (aObj.id === String(bObj.days)) {
    //         aObj.timestamp = bObj.timestamp;
    //       }
    //     });
    //   });
      
    //   console.log(trend.data.data.interestRates);
      
            // const historyData = {
        //     "data": {
        //       "account": {
        //         "id": "0x2a0b0bdbe9c2947edd263f5bc43b75f6a2b27f81",
        //         "openPositionCount": 2,
        //         "positionCount": 2,
        //         "positions": [
        //           {
        //             "balance": "2500000000000000000000",
        //             "hashClosed": null,
        //             "hashOpened": "0x83817c70420120668696f58718f1afefcbd1fdb0bed2f91a8e5a806f294ac12b",
        //             "timestampClosed": null,
        //             "timestampOpened": "1694433287",
        //             "snapshots": [
        //               {
        //                 "balanceUSD": "2499.54405",
        //                 "balance": "2500000000000000000000"
        //               }
        //             ],
        //             "asset": {
        //               "lastPriceUSD": "0.99992747",
        //               "name": "Dai Stablecoin",
        //               "symbol": "DAI",
        //               "decimals": 18,
        //               "id": "0x6b175474e89094c44da98b954eedeac495271d0f"
        //             },
        //             "side": "BORROWER",
        //             "id": "0x2a0b0bdbe9c2947edd263f5bc43b75f6a2b27f81-0x4dedf26112b3ec8ec46e7e31ea5e123490b05b8b-BORROWER-VARIABLE-0"
        //           },
        //           {
        //             "balance": "2800000000000000000",
        //             "hashClosed": null,
        //             "hashOpened": "0x0fa5dcf1a222abcfaee14be0d550f89a0f3772c4694a4b5b2f7027cdb6ba01b9",
        //             "timestampClosed": null,
        //             "timestampOpened": "1694433119",
        //             "snapshots": [
        //               {
        //                 "balanceUSD": "4447.52",
        //                 "balance": "2800000000000000000"
        //               }
        //             ],
        //             "asset": {
        //               "lastPriceUSD": "1604.5",
        //               "name": "Wrapped Ether",
        //               "symbol": "WETH",
        //               "decimals": 18,
        //               "id": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
        //             },
        //             "side": "COLLATERAL",
        //             "id": "0x2a0b0bdbe9c2947edd263f5bc43b75f6a2b27f81-0x59cd1c87501baa753d0b5b5ab5d8416a45cd71db-COLLATERAL-0"
        //           }
        //         ]
        //       }
        //     }
        //   }


// {
//     marketDailySnapshots {
//       days
//       timestamp
//     }
//   }

