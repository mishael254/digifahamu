// MembersProjectsGraph.js
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Api from "views/Api";

const MembersProjectsGraph = () => {
  const { members, projects, } = Api();

  // Initialize state for chart data
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Members Count",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(29,140,248,0.2)",
        borderColor: "#1f8ef1",
        borderWidth: 2,
        data: [],
      },
    ],
  });
  // Chart options
  // Chart options
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
  

  useEffect(() => {
    // Map project names and corresponding member counts
    const projectNames = projects.map((project) => project.projectname);
    const membersCountByProject = projects.map((project) =>
      members.filter((member) => member.project === project.id).length
    );

    // Update chart data state
    setChartData((prevData) => ({
      ...prevData,
      labels: projectNames,
      datasets: [
        {
          ...prevData.datasets[0],
          fill: true,
          backgroundColor: "rgba(29,140,248,0.2)",
          borderColor: "#1f8ef1",
          borderWidth: 2,
          data: membersCountByProject,
        },
      ],
    }));
  }, [members, projects]);

  return (
    <div className="chart-area">
      <Line data={chartData } options={chartOptions}/>
    </div>
  );
};

export default MembersProjectsGraph;
