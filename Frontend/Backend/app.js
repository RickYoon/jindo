var express = require('express');
var app = express();

const { getUserData } = require('./functions');


app.get('/', async function (req, res) {

  // const balance = await getUserData()

  // console.log("balance",balance)


    // 3초 지연
    setTimeout(async () => {

      const balance = {
        "totalBalance": 2072,
        "positionPnlUSD": 123,
        "positionPnlPercent": 10.2,
        "Lending": [
            {
                "tokenName": "WETH",
                "lendingDate": "2023-09-11T11:51:59.000Z",
                "lendingDays": 41,
                "closeLendingDate": 0,
                "amountInitial": 2.8,
                "priceInitial": 1588.4000000000003,
                "valueInitial": 4447.52,
                "amountNow": 2.8063074247059214,
                "priceNow": 1633.43,
                "valueNow": 4583.906736737394,
                "amountDiff": 0.006307424705921605,
                "priceDiff": 45.029999999999745,
                "valueDiff": 136.38673673739322,
                "type": "COLLATERAL",
                "assetId": "0x59cd1c87501baa753d0b5b5ab5d8416a45cd71db",
                "rawId": "0x2a0b0bdbe9c2947edd263f5bc43b75f6a2b27f81-0x59cd1c87501baa753d0b5b5ab5d8416a45cd71db-COLLATERAL-0",
                "txHash": "0x0fa5dcf1a222abcfaee14be0d550f89a0f3772c4694a4b5b2f7027cdb6ba01b9"
            }
        ],
        "Borrowing": [
            {
                "tokenName": "DAI",
                "lendingDate": "2023-09-11T11:54:47.000Z",
                "lendingDays": 40,
                "closeLendingDate": 0,
                "amountInitial": 2500,
                "priceInitial": 0.99981762,
                "valueInitial": 2499.54405,
                "amountNow": 2514.940554620023,
                "priceNow": 0.99992367,
                "valueNow": 2514.7485892074887,
                "amountDiff": 14.940554620022795,
                "priceDiff": 0.00010605000000007969,
                "valueDiff": 15.204539207488779
            }
        ]
    }

    res.header("Access-Control-Allow-Origin", "*");
    res.send(balance);
  }, 3000); // 3000 밀리초 = 3초
  
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
