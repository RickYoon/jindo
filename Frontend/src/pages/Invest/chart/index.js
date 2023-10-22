import React, { useState } from "react";
import Chart from "react-apexcharts";

function App(chartData) {
  const max = 90;
  const min = 30;

  console.log("chartDate", chartData)

  const [mixedChartOptions] = useState({
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "10%",
      },
    },
    stroke: {
      width: [3, 0, 0],
    },
    xaxis: {
      categories: chartData.data.date
      ,
      tickAmount: 5
    },
    markers: {
      size: 3,
      strokeWidth: 0,
      fillOpacity: 0,
      strokeOpacity: 0,
      hover: {
        size: 8,
      },
    },
    yaxis: {
      tickAmount: 5,
      min: 0,
      // max: 100,
    },
  });

  const [mixedChartSeries, setMixedChartSeries] = useState([
    {
      name: "APR",
      type: "column",
      data: chartData.data.data
    }
  ]);

  const [radialChartOptions] = useState({
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: "#fff",
          strokeWidth: "67%",
          margin: 0,
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -20,
            show: true,
            color: "#888",
            fontSize: "13px",
          },
          value: {
            formatter: function (val) {
              return val;
            },
            color: "#111",
            fontSize: "30px",
            show: true,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#ABE5A1"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Percent"],
  });

  const [radialChartSeries] = useState([76]);

  const [barChartOptions] = useState({
    chart: {
      stacked: true,
      stackType: "100%",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      dropShadow: {
        enabled: true,
      },
    },
    stroke: {
      width: 0,
    },
    xaxis: {
      categories: ["Fav Color"],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    fill: {
      opacity: 1,
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.35,
        gradientToColors: undefined,
        inverseColors: false,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [90, 0, 100],
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "right",
    },
  });

  const [barChartSeries, setBarChartSeries] = useState([
    {
      name: "blue",
      data: [32],
    },
    {
      name: "green",
      data: [41],
    },
    {
      name: "yellow",
      data: [12],
    },
    {
      name: "red",
      data: [65],
    },
  ]);

  const updateCharts = () => {
    const newMixedSeries = this.state.seriesMixedChart.map((s) => ({
      data: s.data.map(() =>
        Math.floor(Math.random() * (max - min + 1)) + min
      ),
      type: s.type,
    }));

    const newBarSeries = this.state.seriesBar.map((s) => ({
      data: s.data.map(() =>
        Math.floor(Math.random() * (180 - min + 1)) + min
      ),
      name: s.name,
    }));

    setMixedChartSeries(newMixedSeries);
    setBarChartSeries(newBarSeries);
  };

  return (
    <div className="app">
      <div className="row">
        <div className="col mixed-chart">
          <Chart
            options={mixedChartOptions}
            series={mixedChartSeries}
            type="line"
            // width="1000"
            height="300"
          />
        </div>
      </div>

    </div>
  );
}

export default App;
