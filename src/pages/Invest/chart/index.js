import React, { useState } from "react";
import Chart from "react-apexcharts";

function App() {
  const max = 90;
  const min = 30;

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
      categories: [
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
      ]
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
      data: [
        0.89, 0.83, 0.80, 0.80, 0.76, 0.80, 0.88, 0.90, 0.82, 0.60, 0.56, 0.54, 0.54, 0.54, 0.53, 3.28, 1.71, 1.56, 1.56, 1.56, 1.03, 1.03, 1.03, 1.02, 1.02, 1.61, 1.61, 1.61, 1.61, 1.21, 1.21, 1.22, 1.22, 1.22, 1.22, 2.42, 27.80, 2.85, 0.69, 0.69, 0.70, 0.70, 0.70, 0.70, 0.78, 0.62, 0.68, 0.68, 0.76, 0.71, 0.72, 2.03, 1.59, 1.87, 1.99, 2.12, 2.05, 1.96, 1.93, 1.95, 1.97, 2.40, 0.72, 0.71, 0.43, 1.28, 1.24, 1.38, 1.87, 1.88, 2.03, 2.63, 1.03, 0.91, 2.18, 1.10, 1.02, 1.19, 1.84, 1.63, 1.85, 1.85, 1.72, 1.69, 1.63, 1.45, 1.93, 1.95, 2.19, 2.36, 2.18, 2.27, 2.79
      ]
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
