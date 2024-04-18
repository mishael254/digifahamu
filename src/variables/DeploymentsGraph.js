import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Api from "views/dataviews/reduximplementation/Api";
import { format, parseISO } from "date-fns";
import { chartOptions } from "./charts";

function DeploymentLineGraph() {
  // Use the Api component to get deployment data from the Redux store
  const { deployments } = Api();

  // State to store deployment data
  const [deploymentData, setDeploymentData] = useState({
    labels: [],
    datasets: [
      {
        label: "Deployment Frequency",
        backgroundColor: "#11cdef",
        borderWidth: 1,
        borderColor: "#11cdef",
        hoverBackgroundColor: "#11cdef",
        hoverBorderColor: "#11cdef",
        data: [],
      },
    ],
  });

  // useEffect to calculate deployment occurrences per month
  useEffect(() => {
    const deploymentCounts = deployments.reduce((acc, deployment) => {
      const deploymentDate = parseISO(deployment.deploymentdate);
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
          data: Object.values(deploymentCounts),
        },
      ],
    }));
  }, [deployments]);

  return (
    <div className="chart">
      <Bar data={deploymentData} options={chartOptions()} />
    </div>
  );
}

export default DeploymentLineGraph;
