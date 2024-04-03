// MembersAgeGraph.js
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Api from "views/Api";

const MembersAgeGraph = () => {
  const { members } = Api();

  // Initialize state for chart data
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Members count",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(29,140,248,0.2)",
        borderColor: "#1f8ef1",
        borderWidth: 2,
        data: [],
      },
    ],
  });

  useEffect(() => {
    // Map age values and corresponding member counts
    const ages = Array.from(new Set(members.map((member) => member.age)));
    const membersCountByAge = ages.map((age) =>
      members.filter((member) => member.age === age).length
    );

    // Update chart data state
    setChartData((prevData) => ({
      ...prevData,
      labels: ages,
      datasets: [
        {
          ...prevData.datasets[0],
          fill: true,
          backgroundColor: "rgba(29,140,248,0.2)",
          borderColor: "#1f8ef1",
          borderWidth: 2,
          data: membersCountByAge,
        },
      ],
    }));
  }, [members]);

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

  return (
    <div className="chart-area">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default MembersAgeGraph;
