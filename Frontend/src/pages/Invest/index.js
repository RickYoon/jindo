/* eslint-disable no-undef */
import 'App.css'; 
import styled, { keyframes } from 'styled-components';

import {useState, useEffect} from "react";
import ApexChart from "react-apexcharts";

import axios from 'axios';
import { useDispatch , useSelector } from 'react-redux';

import App from "./chart"
import Apps from "./chart/taa"

function Invest() {

  // const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const userAccount = useSelector(state => state.account) // 지갑주소  

  const chartData = {
    date : [
    "2023-08-01",
    "2023-08-02",
    "2023-08-03",
    "2023-08-04",
    "2023-08-05",
    "2023-08-06",
    "2023-08-07",
    "2023-08-08",
    "2023-08-09",
    "2023-08-10",
    "2023-08-11",
    "2023-08-12",
    "2023-08-13",
    "2023-08-14",
    "2023-08-15",
    "2023-08-16",
    "2023-08-17",
    "2023-08-18",
    "2023-08-19",
    "2023-08-20",
    "2023-08-21",
    "2023-08-22",
    "2023-08-23",
    "2023-08-24",
    "2023-08-25",
    "2023-08-26",
    "2023-08-27",
    "2023-08-28",
    "2023-08-29",
    "2023-08-30",
    "2023-08-31",
    "2023-09-01",
    "2023-09-02",
    "2023-09-03",
    "2023-09-04",
    "2023-09-05",
    "2023-09-06",
    "2023-09-07",
    "2023-09-08",
    "2023-09-09",
    "2023-09-10",
    "2023-09-11",
    "2023-09-12",
    "2023-09-13",
    "2023-09-14",
    "2023-09-15",
    "2023-09-16",
    "2023-09-17",
    "2023-09-18",
    "2023-09-19",
    "2023-09-20",
    "2023-09-21",
    "2023-09-22",
    "2023-09-23",
    "2023-09-24",
    "2023-09-25",
    "2023-09-26",
    "2023-09-27",
    "2023-09-28",
    "2023-09-29",
    "2023-09-30",
    "2023-10-01",
    "2023-10-02",
    "2023-10-03",
    "2023-10-04",
    "2023-10-05",
    "2023-10-06",
    "2023-10-07",
    "2023-10-08",
    "2023-10-09",
    "2023-10-10",
    "2023-10-11",
    "2023-10-12",
    "2023-10-13",
    "2023-10-14",
    "2023-10-15",
    "2023-10-16",
    "2023-10-17",
    "2023-10-18",
    "2023-10-19",
    "2023-10-20",
    "2023-10-21"
  ],
data : [
  0.89, 0.83, 0.80, 0.80, 0.76, 0.80, 0.88, 0.90, 0.82, 0.60, 0.56, 0.54, 0.54, 0.54, 0.53, 3.28, 1.71, 1.56, 1.56, 1.56, 1.03, 1.03, 1.03, 1.02, 1.02, 1.61, 1.61, 1.61, 1.61, 1.21, 1.21, 1.22, 1.22, 1.22, 1.22, 2.42, 27.80, 2.85, 0.69, 0.69, 0.70, 0.70, 0.70, 0.70, 0.78, 0.62, 0.68, 0.68, 0.76, 0.71, 0.72, 2.03, 1.59, 1.87, 1.99, 2.12, 2.05, 1.96, 1.93, 1.95, 1.97, 2.40, 0.72, 0.71, 0.43, 1.28, 1.24, 1.38, 1.87, 1.88, 2.03, 2.63, 1.03, 0.91, 2.18, 1.10, 1.02, 1.19, 1.84, 1.63, 1.85, 1.85, 1.72, 1.69, 1.63, 1.45, 1.93, 1.95, 2.19, 2.36, 2.18, 2.27, 2.79
]}

  const [userStatus, setUserStatus] = useState({
    Spark : {
      totalBalance : 2072,
      positionPnlUSD : 123,
      positionPnlPercent : 10.2,
      Lending : [{
        tokenName: 'WETH',
        lendingDate: "2023-09-11T11:51:59.000Z",
        lendingDays: 40,
        closeLendingDate: 0,
        amountInitial: 2.8,
        priceInitial: 1588.4000000000003,
        valueInitial: 4447.52,
        amountNow: 2.8062735427350525,
        priceNow: 1634.357026,
        valueNow: 4586.452881446944,
        amountDiff: 0.006273542735052651,
        priceDiff: 45.95702599999959,
        valueDiff: 138.9328814469436,
        type: 'COLLATERAL',
        assetId: '0x59cd1c87501baa753d0b5b5ab5d8416a45cd71db',
        rawId: '0x2a0b0bdbe9c2947edd263f5bc43b75f6a2b27f81-0x59cd1c87501baa753d0b5b5ab5d8416a45cd71db-COLLATERAL-0',
        txHash: '0x0fa5dcf1a222abcfaee14be0d550f89a0f3772c4694a4b5b2f7027cdb6ba01b9',
        aprTrend: { data: [Object] }
      }],
      Borrowing : [{
        tokenName: 'DAI',
        lendingDate: "2023-09-11T11:54:47.000Z",
        lendingDays: 40,
        closeLendingDate: 0,
        amountInitial: 2500,
        priceInitial: 0.99981762,
        valueInitial: 2499.54405,
        amountNow: 2514.8429064446755,
        priceNow: 1.00009298,
        valueNow: 2515.0767365381166,
        amountDiff: 14.842906444675464,
        priceDiff: 0.0002753600000000578,
        valueDiff: 15.53268653811665,
        aprTrend: [
          { 
            date: [],
            data: []
          }
        ]
      }]
    }
  })

  useEffect(()=>{

    loadUserStatus()
    // if(userAccount === ""){
    //   setUserStatus({
    //     Spark : {
    //       totalBalance : 0,
    //       positionPnlUSD : 0,
    //       positionPnlPercent : 0,
    //       Lending : [{
    //         tokenName : "Ethereum",
    //         lendingDate : "2023-10-09",
    //         lendingDays : 35,
    //         amountInitial : 2.8,
    //         amountNow : 2.81,
    //         amountDiff : 0.01,
    //         priceInitial : 2.8,
    //         priceNow : 2.81,
    //         priceDiff : 0.01,
    //         valueInitial : 2.8,
    //         valueNow : 2.81,
    //         valueDiff : 0.01,
    //         aprTrend: [
    //           { 
    //             date: [],
    //             data: []
    //           }
    //         ]
    //       }],
    //       Borrowing : [{
    //         tokenName : "DAI",
    //         lendingDate : "2023-10-09",
    //         lendingDays : 35,
    //         amountInitial : 2.8,
    //         amountNow : 2.81,
    //         amountDiff : 0.01,
    //         priceInitial : 2.8,
    //         priceNow : 2.81,
    //         priceDiff : 0.01,
    //         valueInitial : 2.8,
    //         valueNow : 2.81,
    //         valueDiff : 0.01,
    //         aprTrend: [
    //           { 
    //             date: [],
    //             data: []
    //           }
    //         ]
    //       }]
    //     }
    //   })
    // } else {
    //   loadUserStatus()
    // }

  },[userAccount])



  async function loadUserStatus () {


    try {

      
    if(userAccount!==""){
      setIsLoading(true)
      try {
        const info = await axios.get(`http://localhost:4000`)        
        setUserStatus({Spark :info.data})
        setIsLoading(false)
  
      } catch (error) {
        console.log("err", error)
      }

      // setIsLoading(false)

      
    }

  } catch (error) {
      
  }

  }


  return (
    <>
      <div>
        <div>   
          <OverBox>
              <SubTemplateBlockVertical>                

                <Wrappertitle>
                      <span className="mx-3 text-xl font-medium" style={{fontWeight:"600"}}>
                        <FontStyle>My position report</FontStyle>
                      </span>
                </Wrappertitle>

                <div style={{paddingTop:"20px"}}/>
                  <Shadowbox className="border border-gray-200 rounded-lg p-5 bg-white">
                    <div className="flex items-center">
                    <span className="text-base pb-3" style={{fontWeight:"700"}}><FontStyle>Support Assets (Demo) </FontStyle></span>
                    </div>
                    <div className="">
                      
                        {isLoading ?
                        <ProductSkeleton width="150px" height="30px"/>
                        :
                        <>
                        <div className="flex justify-between items-end">
                          <div className="text-1xl text-left">SPARK - Lending (ETH), Borrowing (DAI)</div>
                          {/* <div className="text-sm text-right mb-0  text-gray-500" >총 321 회 채굴</div> */}
                        </div>
                        </>
                        }
                    </div>
                </Shadowbox>  

            {userAccount === "" ?
            <>                 
              <Shadowbox className="border border-gray-200 rounded-lg p-10 bg-white mt-5">
                <div className="flex justify-center">
                  <span className="text-xl text-center" style={{fontWeight:"700"}}>
                    <FontStyle>CONNECT WALLET!!</FontStyle>
                  </span>
                </div>
              </Shadowbox>  
            </>
            : isLoading ?
            <></>
            :
            <Shadowbox className="border border-gray-200 rounded-lg p-6 bg-white mt-5">

              <p className="text-base pb-5" style={{fontWeight:"700"}}><FontStyle>Spark</FontStyle></p>
              <div>Total Value</div>
              <div className="text-xl pt-2">$ 4,635 </div>

              <br />
              <div>Position PnL</div>
              <div style={{color:"blue"}} className="text-base pt-2">+ $ 188 USD 
                ( 4.1 % )
              </div>

              <br />
              <hr />
              <br/>
              <div>Lending</div> 
              <br/>
              <div>Token : {userStatus.Spark.Lending[0].tokenName}</div>
              <div style={{color:"gray", fontSize:"13px"}}  class="pt-2">Lending Date : 
                {userStatus.Spark.Lending[0].lendingDate} 
                ({userStatus.Spark.Lending[0].lendingDays} days ago)
              </div>
              <br />

            <div className='p-0'>
              <div class="relative overflow-x-auto">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                              <th scope="col" class="px-3 py-3">
                                  <FontStyle>Category</FontStyle>
                              </th>
                              <th scope="col" class="px-3 py-3">
                                  Inital
                              </th>
                              <th scope="col" class="px-3 py-3">
                                  Current
                              </th>
                              <th scope="col" class="px-3 py-3">
                                  Dif
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr class="bg-white border-b text-black dark:bg-black-800 dark:border-gray-700">
                              <th scope="row" class="px-3 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                                  Amount
                              </th>
                              <td class="px-6 py-4">
                              {userStatus.Spark.Lending[0].amountInitial.toFixed(2)} ETH
                              </td>
                              <td class="px-6 py-4">
                              {userStatus.Spark.Lending[0].amountNow.toFixed(2)} ETH
                              </td>
                              <td class="px-6 py-4">
                              {userStatus.Spark.Lending[0].amountDiff > 0 ?
                                 <span style={{color:"blue"}}> +{userStatus.Spark.Lending[0].amountDiff.toFixed(2)} ETH</span>
                                :
                                <span style={{color:"red"}}> -{userStatus.Spark.Lending[0].amountDiff.toFixed(2)} ETH</span>
                              }
                              </td>
                          </tr>
                          <tr class="bg-white border-b text-black dark:bg-black-800 dark:border-gray-700">
                              <th scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Price
                              </th>
                              <td class="px-6 py-4">
                              {userStatus.Spark.Lending[0].priceInitial.toFixed(2)} $
                              </td>
                              <td class="px-6 py-4">
                              {userStatus.Spark.Lending[0].priceNow.toFixed(2)} $
                              </td>
                              <td class="px-6 py-4">
                              {userStatus.Spark.Lending[0].priceDiff > 0 ?
                                 <span style={{color:"blue"}}> +{userStatus.Spark.Lending[0].priceDiff.toFixed(2)} $ </span>
                                :
                                <span style={{color:"red"}}> -{userStatus.Spark.Lending[0].priceDiff.toFixed(2)} $ </span>
                              }
                              </td>


                          </tr>
                          <tr class="bg-white border-b text-black dark:bg-black-800 dark:border-gray-700">
                              <th scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Value
                              </th>
                              <td class="px-6 py-4">
                                {userStatus.Spark.Lending[0].valueInitial.toFixed(2)} $
                              </td>
                              <td class="px-6 py-4">
                              {userStatus.Spark.Lending[0].valueNow.toFixed(2)} $
                              </td>
                              <td class="px-6 py-4">
                              {userStatus.Spark.Lending[0].valueDiff > 0 ?
                                 <span style={{color:"blue"}}> +{userStatus.Spark.Lending[0].valueDiff.toFixed(2)} $ </span>
                                :
                                <span style={{color:"red"}}> -{userStatus.Spark.Lending[0].valueDiff.toFixed(2)} $ </span>
                              } 
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              </div>
              <div class="pt-5">APR trend</div>
              <App data = {chartData}/>              

              <hr />
            <br/>
            <div>Borrowing</div> 
            <br/>
            <div>Token : {userStatus.Spark.Borrowing[0].tokenName}</div>
            <div style={{color:"gray", fontSize:"13px"}}  class="pt-2">Lending Date : 
                {userStatus.Spark.Borrowing[0].lendingDate} 
                ({userStatus.Spark.Borrowing[0].lendingDays} days ago)
              </div>

            <br />

            <div className='p-0'>
              <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                              <th scope="col" class="px-3 py-3">
                                  <FontStyle>Category</FontStyle>
                              </th>
                              <th scope="col" class="px-3 py-3">
                                  Inital
                              </th>
                              <th scope="col" class="px-3 py-3">
                                  Current
                              </th>
                              <th scope="col" class="px-3 py-3">
                                  Dif
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr class="bg-white border-b text-black dark:bg-black-800 dark:border-gray-700">
                              <th scope="row" class="px-3 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                                  Amount
                              </th>
                              <td class="px-6 py-4">
                              {userStatus.Spark.Borrowing[0].amountInitial.toFixed(2)} DAI
                              </td>
                              <td class="px-6 py-4">
                              {userStatus.Spark.Borrowing[0].amountNow.toFixed(2)} DAI
                              </td>
                              <td class="px-6 py-4">
                              {userStatus.Spark.Borrowing[0].amountDiff > 0 ?
                                 <span style={{color:"blue"}}> +{userStatus.Spark.Borrowing[0].amountDiff.toFixed(2)} DAI </span>
                                :
                                <span style={{color:"red"}}> -{userStatus.Spark.Borrowing[0].amountDiff.toFixed(2)} DAI </span>
                              } 
                              </td>
                          </tr>
                          <tr class="bg-white border-b text-black dark:bg-black-800 dark:border-gray-700">
                              <th scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Price
                              </th>
                              <td class="px-6 py-4">
                              {userStatus.Spark.Borrowing[0].priceInitial.toFixed(2)} $
                              </td>
                              <td class="px-6 py-4">
                              {userStatus.Spark.Borrowing[0].priceNow.toFixed(2)} $
                              </td>
                              <td class="px-6 py-4">
                              {userStatus.Spark.Borrowing[0].priceDiff > 0 ?
                                 <span style={{color:"blue"}}> +{userStatus.Spark.Borrowing[0].priceDiff.toFixed(2)} $ </span>
                                :
                                <span style={{color:"red"}}> -{userStatus.Spark.Borrowing[0].priceDiff.toFixed(2)} $ </span>
                              } 
                              </td>


                          </tr>
                          <tr class="bg-white border-b text-black dark:bg-black-800 dark:border-gray-700">
                              <th scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Value
                              </th>
                              <td class="px-6 py-4">
                                {userStatus.Spark.Borrowing[0].valueInitial.toFixed(2)} $
                              </td>
                              <td class="px-6 py-4">
                              {userStatus.Spark.Borrowing[0].valueNow.toFixed(2)} $
                              </td>
                              <td class="px-6 py-4">
                              {userStatus.Spark.Borrowing[0].valueDiff > 0 ?
                                 <span style={{color:"blue"}}> +{userStatus.Spark.Borrowing[0].valueDiff.toFixed(2)} $ </span>
                                :
                                <span style={{color:"red"}}> -{userStatus.Spark.Borrowing[0].valueDiff.toFixed(2)} $ </span>
                              } 
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              </div>
              <div class="pt-5">APR trend</div>
              <Apps />        
              
              <br/>
            <div>Saving (* here is not real data)</div> 
            <br/>
            <div>Token : sDAI</div>
            <div style={{color:"gray", fontSize:"13px"}}  class="pt-2">Lending Date : 
                {userStatus.Spark.Borrowing[0].lendingDate} 
                ({userStatus.Spark.Borrowing[0].lendingDays} days ago)
              </div>

            <br />

            <div className='p-0'>
              <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                              <th scope="col" class="px-3 py-3">
                                  <FontStyle>Category</FontStyle>
                              </th>
                              <th scope="col" class="px-3 py-3">
                                  Inital
                              </th>
                              <th scope="col" class="px-3 py-3">
                                  Current
                              </th>
                              <th scope="col" class="px-3 py-3">
                                  Dif
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr class="bg-white border-b text-black dark:bg-black-800 dark:border-gray-700">
                              <th scope="row" class="px-3 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                                  Amount
                              </th>
                              <td class="px-6 py-4">
                              2,552 DAI
                              </td>
                              <td class="px-6 py-4">
                              2,566 DAI
                              </td>
                              <td class="px-6 py-4">
                              {userStatus.Spark.Borrowing[0].amountDiff > 0 ?
                                 <span style={{color:"blue"}}> + 14 DAI </span>
                                :
                                <span style={{color:"red"}}> -{userStatus.Spark.Borrowing[0].amountDiff.toFixed(2)} DAI </span>
                              } 
                              </td>
                          </tr>
                          <tr class="bg-white border-b text-black dark:bg-black-800 dark:border-gray-700">
                              <th scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Price
                              </th>
                              <td class="px-6 py-4">
                              {userStatus.Spark.Borrowing[0].priceInitial.toFixed(2)} $
                              </td>
                              <td class="px-6 py-4">
                              {userStatus.Spark.Borrowing[0].priceNow.toFixed(2)} $
                              </td>
                              <td class="px-6 py-4">
                              {userStatus.Spark.Borrowing[0].priceDiff > 0 ?
                                 <span style={{color:"blue"}}> +{userStatus.Spark.Borrowing[0].priceDiff.toFixed(2)} $ </span>
                                :
                                <span style={{color:"red"}}> -{userStatus.Spark.Borrowing[0].priceDiff.toFixed(2)} $ </span>
                              } 
                              </td>


                          </tr>
                          <tr class="bg-white border-b text-black dark:bg-black-800 dark:border-gray-700">
                              <th scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Value
                              </th>
                              <td class="px-6 py-4">
                                2,552 $
                              </td>
                              <td class="px-6 py-4">
                                2,566 $
                              </td>
                              <td class="px-6 py-4">
                              {userStatus.Spark.Borrowing[0].valueDiff > 0 ?
                                 <span style={{color:"blue"}}> + 14 $ </span>
                                :
                                <span style={{color:"red"}}> -{userStatus.Spark.Borrowing[0].valueDiff.toFixed(2)} $ </span>
                              } 
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              </div>
                    
            </Shadowbox>
            }

            
            <div style={{height:"50px"}}></div>
            <div style={{marginTop:"50px"}}></div>
            </SubTemplateBlockVertical>
          </OverBox>
        </div>
      </div>




    <div id="crypto-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="crypto-modal">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                    Connect wallet
                </h3>
            </div>
            <div class="p-6">
                <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Connect with one of our available wallet providers or create a new one.</p>
            </div>
      </div>
    </div>
  </div>
    </>
  );
}

const FontStyle = styled.span`
  /* font-family: "Noto Sans Korean"; */
`


const skeletonKeyframes = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;


export const ProductSkeleton = styled.div`
  display: inline-block;
  height: ${props => props.height || "20px"};
  width: ${props => props.width || "50%"};
  animation: ${skeletonKeyframes} 1300ms ease-in-out infinite;
  background-color: #eee;
  background-image: linear-gradient( 100deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 80% );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  margin-top: ${props => props.marginTop || "0"}
`;



/* 
const Title = styled.h1`
  font-weight: 600;
  font-size: 20px;
` */

const Wrappertitle = styled.div`
  margin: 0px auto 10px auto;
  /* text-align: center; */
  
  /* width: 1136px; */
  @media screen and (max-width: 950px){
    width: 100%;
    padding-top: 20px;
    color: black;
  }
  @media screen and (max-width: 500px){
    width: 100%;
    padding-top: 20px;
    /* color: gray; */
  }
`

const OverBox = styled.div`

  position: relative;
  margin: 10px auto; 
  width: calc(100% - (230px));
  width: -moz-calc(100% - (230px));
  width: -webkit-calc(100% - (230px));
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  /* height: 100vh; */
  overflow: auto;
  /* padding: 30px; */

  @media screen and (max-width: 950px){
    width: calc(100%);
    width: -moz-calc(100%);
    width: -webkit-calc(100%);
    padding: 10px;
  }
`

const Shadowbox = styled.div`

  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  min-width: 0px;
  overflow-wrap: break-word;
  background-color: rgb(255, 255, 255);
  background-clip: border-box;
  border: 0px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.75rem;
  box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
  overflow: visible;
`



const SubTemplateBlockVertical = styled.div`
     /* width: 900px; */
     max-width: 1200px;
    margin: 10px auto;
    /* width: 460px; */
    /* padding-bottom: 10px; */
    position: relative; 
    /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    /* padding:15px; */
    /* display:flex; */
    /* flex-direction:column; */

    /* padding: 20px 25px !important;
    background: #fff; */

    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    min-width: 0px;
    overflow-wrap: break-word;
    /* background-color: rgb(255, 255, 255); */
    background-clip: border-box;
    /* border: 1px solid rgba(0, 0, 0, 0.125); */
    /* border-radius: 0.75rem; */
    /* box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem; */
    /* overflow: visible; */
    
  @media screen and (max-width: 500px){
      width: 100%;
      /* margin: 10px 10px; */
      font-size: 12px;
    }
`;



export default Invest;

