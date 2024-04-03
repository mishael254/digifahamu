import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Api from "views/Api";

function ZoneBarGraph() {
  // Use the Api component to get project data from the Redux store
  const { projects } = Api();

  // State to store zone data
  const [zoneData, setZoneData] = useState({
    labels: [],
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
    },
    responsive: true,
    datasets: [
      {
        label: "Projects ",
        fill: true,
        backgroundColor: "rgba(119,52,169,0)",
        hoverBackgroundColor:"#d048b6",
        borderColor: "#d048b6",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        data: [],
      },
    ],
  });
  // Chart options
const chartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        autoSkip: true,
        maxTicksLimit: 10,
      },
    },
    x: {
      gridLines: {
        display: true,
      },
    },
  },
};


  // useEffect to calculate zone occurrences
  useEffect(() => {
    const zoneCounts = projects.reduce((acc, project) => {
      const normalizedZone = project.zone.toLowerCase();
      acc[normalizedZone] = (acc[normalizedZone] || 0) + 1;
      return acc;
    }, {});

    // Find the maximum occurrences
    const maxOccurrences = Math.max(...Object.values(zoneCounts));

    // Update state with zone data
    setZoneData((prevData) => ({
      ...prevData,
      labels: Object.keys(zoneCounts),
      datasets: [
        {
          ...prevData.datasets[0],
          
          data: Object.values(zoneCounts),
        },
      ],
    }));

    // Set the y-axis max dynamically based on the maximum occurrences
    setYAxisMax(maxOccurrences);
  }, [projects]);

  const setYAxisMax = (max) => {
    // Update the chart options with the dynamic y-axis max
    setZoneData((prevData) => ({
      ...prevData,
      responsive: true,
      options: {
        scales: {
          y: {
            drawBorder: false,
            beginAtZero: true,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent",
            max: max,
          },
        },
      },
    }));
  };

  return (
    <div className="chart-area">
      <Bar data={zoneData} options={chartOptions} />
    </div>
  );
}

export default ZoneBarGraph;
