import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Api from "views/Api";
import { format, parseISO } from "date-fns";
function DeploymentLineGraph() {
  // Use the Api component to get deployment data from the Redux store
  const { deployments } = Api();

  // State to store deployment data
  const [deploymentData, setDeploymentData] = useState({
    labels: [],
    datasets: [
      {
        label: "Deployment Frequency",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(66,134,121,0)",
        borderColor: "#00d6b4",
        borderCapStyle: "butt",
        borderWidth: 2,
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
  

  // useEffect to calculate deployment occurrences per month
  useEffect(() => {
    const deploymentCounts = deployments.reduce((acc, deployment) => {
      const deploymentDate = parseISO(deployment.deploymentdate);
      console.log(deploymentDate);
      const monthYear = format(deploymentDate, "MM/yyyy");
      acc[monthYear] = (acc[monthYear] || 0) + 1;
      return acc;
    }, {});

    // Update state with deployment data
    setDeploymentData((prevData) => ({
      ...prevData,
      labels: Object.keys(deploymentCounts),
      datasets: [
        {
          ...prevData.datasets[0],
          label: "Deployment Frequency",
          fill: true,
          fill: true,
          backgroundColor:"rgba(66,134,121,0)",
          borderColor: "#00d6b4",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#00d6b4",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#00d6b4",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          data: Object.values(deploymentCounts),
        },
      ],
    }));
  }, [deployments]);

  return (
    <div className="chart-area">
      <Line data={deploymentData} options={chartOptions}/>
    </div>
  );
}

export default DeploymentLineGraph;
