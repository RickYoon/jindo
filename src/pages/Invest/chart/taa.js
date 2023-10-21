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
        1.00,
        1.00,
        1.00,
        1.00,
        2.79,
        2.71,
        2.68,
        2.68,
        2.63,
        2.68,
        2.78,
        2.81,
        2.70,
        2.41,
        2.34,
        2.32,
        2.31,
        2.31,
        2.32,
        2.30,
        4.82,
        3.63,
        3.49,
        3.49,
        3.49,
        2.96,
        2.96,
        2.95,
        2.95,
        2.94,
        2.94,
        3.54,
        3.54,
        3.54,
        3.54,
        3.15,
        3.15,
        3.16,
        3.16,
        3.16,
        3.16,
        3.16,
        3.16,
        3.16,
        3.16,
        3.16,
        3.16,
        3.16,
        4.21,
        37.14,
        4.53,
        2.53,
        2.53,
        2.54,
        2.54,
        2.54,
        2.54,
        2.54,
        2.54,
        2.65,
        2.43,
        2.51,
        2.52,
        2.62,
        2.55,
        2.26,
        3.38,
        3.05,
        3.27,
        3.35,
        3.44,
        3.39,
        3.32,
        3.30,
        3.31,
        3.33,
        3.61,
        2.27,
        2.25,
        1.90,
        2.80,
        2.77,
        2.89,
        3.26,
        3.27,
        3.37,
        3.76,
        2.58,
        2.46,
        3.48,
        2.64,
        2.57,
        2.73,
        3.00,
        2.87,
        3.01,
        3.01,
        2.93,
        2.91,
        2.86,
        2.73,
        3.06,
        3.07,
        3.22,
        3.32,
        3.32,
        3.27,
        3.28,
        3.56,
        3.14,
        3.08,
        3.08
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
