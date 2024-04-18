import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Api from "views/dataviews/reduximplementation/Api";
import { chartOptions } from "./charts";

const MessagePopularity = () => {
    const { statLogs, isLoading, messages } = Api();
  // State to store chart data


  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Message Popularity",
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
    // Group and sort statLogs by messageUuid
    const sortedStatLogs = {};
    statLogs.forEach((log) => {
      if (!sortedStatLogs[log.messageuuid]) {
        sortedStatLogs[log.messageuuid] = [];
      }
      sortedStatLogs[log.messageuuid].push(log.phone);
    });

    // Iterate through sortedStatLogs and extract messageTitle and count unique phones
    const xAxisLabels = [];
    const yAxisData = [];
    Object.keys(sortedStatLogs).forEach((uuid) => {
      const message = messages.find((msg) => msg.messageuuid === uuid);
      if (message) {
        xAxisLabels.push(message.messagetitle);
        yAxisData.push(new Set(sortedStatLogs[uuid]).size);
      }
    });
    
    // Update chart data state
    setChartData((prevData) => ({
      ...prevData,
      labels: xAxisLabels,
      datasets: [
        {
          ...prevData.datasets[0],
          data: yAxisData,
          
        },
      ],
    }));
  }, [statLogs, messages]);

  

  return (
    <div className="chart">
      <Line data={chartData} options={chartOptions()} />
    </div>
  );
};

export default MessagePopularity;
