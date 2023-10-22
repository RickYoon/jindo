/* eslint-disable no-undef */
import 'App.css'; 
import styled, { keyframes } from 'styled-components';

import {useState, useEffect} from "react";
import ApexChart from "react-apexcharts";

import axios from 'axios';
import { useDispatch , useSelector } from 'react-redux';

import App from "./chart"

function Invest() {

  // const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const userAccount = useSelector(state => state.account) // 지갑주소
  const [userName, setUserName] = useState("a")
  
  const [nodebonus, setNodeBonus] = useState({
    "date": ["10-19","10-20"],
    "data": [13.3,13.2]
  })

  const [userStatus, setUserStatus] = useState({
    total_balance: 0,
    total_rate: 0,
    bonus_rate: 0,
    lastUptimePercent: 0,
    nodeInfo: {
      avgCPU: { '90days': 0, '360days': 0, '730days': 0, '3650days': 0 },
      avgUptime: { '90days': 0, '360days': 0, '730days': 0, '3650days': 0 },
      avgPorts: { '90days': 0, '360days': 0, '730days': 0, '3650days': 0 }
    }
  })

  useEffect(()=>{

    // loadUserStatus()
    if(userAccount === ""){
      setUserStatus({
        total_balance: 0,
        total_rate: 0,
        bonus_rate: 0,
        lastUptimePercent: 0,
        nodeInfo: {
          avgCPU: { '90days': 0, '360days': 0, '730days': 0, '3650days': 0 },
          avgUptime: { '90days': 0, '360days': 0, '730days': 0, '3650days': 0 },
          avgPorts: { '90days': 0, '360days': 0, '730days': 0, '3650days': 0 }
        }
      })
    } else {
      loadUserStatus()
    }

  },[userAccount])

  function onIncompletePaymentFound(payment) {
    console.log(payment);
    };

    function loadJS(url, callback) {
      var script = document.createElement('script');
      var fn = callback || function() {};
      script.type = 'text/javascript';
      script.src = url;
      document.getElementsByTagName('head')[0].appendChild(script);
    
      if (script.readyState) {
          script.onreadystatechange = function() {
              if (script.readyState == 'complete') {
                  script.onreadystatechange = null;
                  setTimeout(function() { fn(); }, 1000);
              }
          };
      } else {
          script.onload = function() {
              setTimeout(function() { fn(); }, 1000);
          };
      }
      //console.log(url);
      if (typeof(url) == "object") {
          url = url[0].path;
      }
    
    }

    // PV.STARTED = false;
    // var PI_LOGIN_FLAGE=false;
    function LOAD_PI() {
      //console.log("LOOOO");
      loadJS("https://sdk.minepi.com/pi-sdk.js", function() {
          if (!PV.PILOADED)
          {
              PV.PILOADED=true;
              PV.PI = Pi;
              PI_LOGIN_EX();
          }
      });
    }

  async function PI_LOGIN_EX() {

    Pi.init({ version: "2.0" });
    const scopes = ['payments', 'username'];

    function onIncompletePaymentFound(payment) {
        if (payment)
        {
            if (typeof(payment)=="object")
            {
                payment=JSON.stringify(payment);
            }
            $.post("/pay", {action:"incomplete",payment:payment}, function(d) {

            });
        }
    };
    console.log("HELLO!!");
    await Pi.authenticate(scopes).then(function(auth) {
        console.log("DDDDD", auth);
        
        PV.STARTED = false;
        PI_LOGIN_FLAGE=true;
        PV.AUTH = auth;

        const lastConnection = localStorage
        // setUserName(JSON.stringify(auth))
        console.log("lastConnection",lastConnection)
        setUserName(lastConnection)

      // setUserName(        // const lastConnection = localStorage.getItem("piCon");
      // )
        if (auth.user.username)
        {
            cart__list();
            piapi({action:"visit",username:auth.user.username,component:"account"}, function(d) {
                PV.PIUSER=d;
            });
        }

    }).catch(function(error) {
        PV.STARTED = false;
        //alert("连接超时, 请重新登录!");
    });
  }

  function PI_LOGIN() {
    
    PV.STARTED = true;
    if (typeof(Pi) == "undefined") {
        LOAD_PI();
    } else {
        PI_LOGIN_EX();
    }

  }


  async function loadUserStatus () {


    try {

      
    if(userAccount!==""){
      setIsLoading(true)
      try {
        const info = await axios.get(`https://a32l6tm894.execute-api.ap-northeast-2.amazonaws.com/production/farminginfo?username=${userAccount.replace(/"/gi, "")}`)
        // const info = await axios.get(`https://a32l6tm894.execute-api.ap-northeast-2.amazonaws.com/production/farminginfo?username=beautisarang`)        
        setUserStatus(info.data)
  
      } catch (error) {
        console.log("err", error)
      }

      setIsLoading(false)

      
    }

  } catch (error) {
      
  }

  }

  const progressBarStyle = {
    width: `${userStatus.lastUptimePercent}%`,
  };

  const chartOptions = {
    colors: ["#1A56DB"],
    series: [{
      name: '일일채굴량',
      type: 'column',
      data: [1.447, 1.6855]
    }],
    chart: {
    height: 350,
    type: 'bar',
    toolbar: {
      show: false,
    }
  },
  stroke: {
    width: [0, 2]
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
    enabledOnSeries: [1]
  },
  labels: ["10-16", "10-17"],
  xaxis: {
    labels: {
      format: 'dd/MM',
    }
  },
  }

  return (
    <>
      <div>
        <div>   
          <OverBox>
              <SubTemplateBlockVertical>                

                <Wrappertitle>
                      <span className="mx-3 text-xl font-medium" style={{fontWeight:"600"}}>
                        <FontStyle>PNL of My Position</FontStyle>
                      </span>
                </Wrappertitle>

                <div style={{paddingTop:"20px"}}/>
                  <Shadowbox className="border border-gray-200 rounded-lg p-5 bg-white">
                    <div className="flex items-center">
                    <span className="text-base pb-3" style={{fontWeight:"700"}}><FontStyle>Connected Protocols</FontStyle></span>
                    </div>
                    <div className="">
                      
                        {isLoading ?
                        <ProductSkeleton width="150px" height="30px"/>
                        :
                        <>
                        <div className="flex justify-between items-end">
                          <div className="text-1xl text-left">SPARK, COMPOUND</div>
                          {/* <div className="text-sm text-right mb-0  text-gray-500" >총 321 회 채굴</div> */}
                        </div>
                        </>
                        }
                    </div>
                </Shadowbox>  
                
            <Shadowbox className="border border-gray-200 rounded-lg p-6 bg-white mt-5">
                  
            <p className="text-base pb-5" style={{fontWeight:"700"}}><FontStyle>Spark</FontStyle></p>

            <div className='mb-5 bg-gray-50 p-5'>
            <div class="mb-1 text-black" style={{fontWeight:"400", fontSize:"13px", paddingBottom:"5px"}}>
            <FontStyle>
              Health Factor 
              - 1.42              
              {/* ( {userStatus.lastUptimePercent.toFixed(2)} % )               */}
            </FontStyle>
            </div>
            <div class="w-full bg-white rounded-full h-2.5 mb-4 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={progressBarStyle}></div>
            </div>
            </div>

            <div>TotalValue : 23,231 USD</div>
            <div>PnL : + 23 USD</div>
            <br />
            <div>Lending</div>
            <div>Token : Ethereum</div>
            <div>Lending Date : 2023-09-10</div>
            <div>Lending Days : 32</div>

           이 부분을 가격변동 수량변동, 총 가치변동 분리해서 표시
            <div>inital state : 2.5 / 1,321 / 1,231 USD</div>
            <div>current state : 2.5 / 1,321 / 1,231 USD</div>

            <div></div>

            <br />

            <div>chart</div>


            <div className='p-0'>
              <div class="relative overflow-x-auto">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                              <th scope="col" class="px-0 py-3">
                                  <FontStyle>항목</FontStyle>
                              </th>
                              <th scope="col" class="px-3 py-3">
                                  90일
                              </th>
                              <th scope="col" class="px-3 py-3">
                                  1년
                              </th>
                              <th scope="col" class="px-3 py-3">
                                  2년
                              </th>
                              <th scope="col" class="px-3 py-3">
                                  10년
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                              <th scope="row" class="px-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  CPU 숫자
                              </th>
                              <td class="px-6 py-4">
                                {userStatus.nodeInfo.avgCPU["90days"].toFixed(2)}
                              </td>
                              <td class="px-6 py-4">
                              {userStatus.nodeInfo.avgCPU["360days"].toFixed(2)}
                              </td>
                              <td class="px-6 py-4">
                              {userStatus.nodeInfo.avgCPU["730days"].toFixed(2)}
                              </td>
                              <td class="px-6 py-4">
                              {userStatus.nodeInfo.avgCPU["3650days"].toFixed(2)}
                              </td>
                          </tr>
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                              <th scope="row" class="px-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Uptime 비율
                              </th>
                              <td class="px-6 py-4">
                                {userStatus.nodeInfo.avgUptime["90days"].toFixed(2)}
                              </td>
                              <td class="px-6 py-4">
                              {userStatus.nodeInfo.avgUptime["360days"].toFixed(2)}
                              </td>
                              <td class="px-6 py-4">
                              {userStatus.nodeInfo.avgUptime["730days"].toFixed(2)}
                              </td>
                              <td class="px-6 py-4">
                              {userStatus.nodeInfo.avgUptime["3650days"].toFixed(2)}
                              </td>

                          </tr>
                          <tr class="bg-white dark:bg-gray-800">
                              <th scope="row" class="px-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              포트개방 비율
                              </th>
                              <td class="px-6 py-4">
                              {userStatus.nodeInfo.avgPorts["90days"].toFixed(2)}
                              </td>
                              <td class="px-6 py-4">
                              {userStatus.nodeInfo.avgPorts["360days"].toFixed(2)}
                              </td>
                              <td class="px-6 py-4">
                              {userStatus.nodeInfo.avgPorts["730days"].toFixed(2)}
                              </td>
                              <td class="px-6 py-4">
                              {userStatus.nodeInfo.avgPorts["3650days"].toFixed(2)}
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              </div>
            </Shadowbox>
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
     /* max-width: 500px; */
    margin: 10px auto;
    width: 460px;
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

