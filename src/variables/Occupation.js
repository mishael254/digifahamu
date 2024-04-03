import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Api from "views/Api";

function OccupationLineGraph() {
  // Use the Api component to get members data from the Redux store
  const {members} = Api();
  const [occupationData, setOccupationData] = useState({
    labels: [],
    datasets: [
      {
        label: "Occupation member Distribution",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 4,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
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


  // useEffect to calculate occupation occurrences
  useEffect(() => {
    const occupationCounts = members.reduce((acc, member) => {
      const normalizedOccupation = member.occupation.toLowerCase();
      acc[normalizedOccupation] = (acc[normalizedOccupation] || 0) + 1;
      return acc;
    }, {});

    // Update state with occupation data
    setOccupationData((prevData) => ({
      ...prevData,
      labels: Object.keys(occupationCounts),
      datasets: [
        {
          ...prevData.datasets[0],
          label: "members Active",
          fill: true,
          backgroundColor: "rgba(29,140,248,0.2)",
          borderColor: "#1f8ef1",
          borderWidth: 2,
          data: Object.values(occupationCounts),
        },
      ],
    }));
  }, [members]);

  return (
    <div className="chart-area">
      
      <Line data={occupationData} options={chartOptions} />
    </div>
  );
}

export default OccupationLineGraph;
