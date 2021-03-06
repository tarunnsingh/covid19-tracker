import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import { Circle, Heart } from "react-spinners-css";
import styles from "./Chart.module.css";

const Chart = ({ data, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    // console.log(dailyData);
    fetchAPI();
  }, []);

  if (!data) {
    return (
      <div>
        <Circle />
      </div>
    );
  }

  const lineChart = dailyData ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true
          },
          {
            data: dailyData.map(({ incident }) => incident),
            label: "Incident Rate",
            borderColor: "#009688",
            fill: false
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
            hoverBackgroundColor: "rgba(240, 20, 0, 0.5)"
          }
        ]
      }}
      options={{
        cubicInterpolationMode: "monotone",
        title: {
          display: true,
          text: "Worldwide Covid-19 Progress"
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label || "";

              if (label) {
                label += ": ";
              }
              label += Math.round(tooltipItem.yLabel * 100) / 100;
              return label;
            }
          }
        },
        responsive: true,
        responsiveAnimationDuration: 2,
        spanGaps: true,
        scales: {
          xAxes: [
            {
              ticks: {
                autoskip: true,
                autoSkipPadding: 10
              },
              type: "time",
              time: {
                displayFormats: {
                  hour: "h:mm a",
                  minute: "h:mm a"
                }
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                autoskip: true
              }
            }
          ]
        }
      }}
    />
  ) : null;

  const barChart = data.confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)"
            ],
            data: [
              data.confirmed.value,
              data.recovered.value,
              data.deaths.value
            ]
          }
        ]
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` }
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>
      {country.localeCompare("Worldwide") ? barChart : lineChart}
    </div>
  );
};

export default Chart;
