import React from "react";
import { Line, Bar } from "react-chartjs-2";
import Api from "views/dataviews/reduximplementation/Api";
const Chart = require("chart.js");

const MessagePopularity = ({ statLogs, activeInterval }) => {
  // Prepare data for the chart based on the active interval
  let filteredLogs = [];
  if (activeInterval === 'monthly') {
    // Filter logs for monthly view
    filteredLogs = filterLogsByMonth(statLogs);
  } else {
    // Filter logs for weekly view
    filteredLogs = filterLogsByWeek(statLogs);
  }

  // Prepare data for the chart
  const data = {
    labels: filteredLogs.map((log) => {
      const timestamp = new Date(log.FirstTimePlayed);
      return timestamp.toLocaleString();
    }),
    datasets: [
      {
        label: 'Message Popularity',
        data: filteredLogs.map((log) => log.NumberOfTimesPlayed || 0),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2>Message Popularity Over Time</h2>
      <Line data={data} />
    </div>
  );
};

// Helper function to filter logs by week
const filterLogsByWeek = (logs) => {
  const currentDate = new Date();
  const currentWeek = getWeekNumber(currentDate);
  
  return logs.filter(log => {
    const logDate = new Date(log.FirstTimePlayed);
    const logWeek = getWeekNumber(logDate);
    return logWeek === currentWeek;
  });
};

// Helper function to get the week number of a date
const getWeekNumber = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return weekNo;
};

// Helper function to filter logs by month
const filterLogsByMonth = (logs) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
  
  return logs.filter(log => {
    const logDate = new Date(log.FirstTimePlayed);
    const logMonth = logDate.getMonth() + 1; // Months are 0-indexed
    return logMonth === currentMonth;
  });
};


export default MessagePopularity;
