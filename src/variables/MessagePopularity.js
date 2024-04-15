// MessagePopularity.js

import React from 'react';
import Chart from 'chart.js';

const MessagePopularity = ({ statLogs, activeNav }) => {
    // Group the stat logs by message UUID to count the number of unique phone numbers associated with each message
    const messagePopularity = statLogs.reduce((popularityMap, log) => {
        if (!popularityMap[log.messageUuid]) {
            popularityMap[log.messageUuid] = new Set();
        }
        popularityMap[log.messageUuid].add(log.phone);
        return popularityMap;
    }, {});

    // Sort messages based on popularity
    const sortedMessages = Object.entries(messagePopularity).sort((a, b) => {
        return b[1].size - a[1].size;
    });

    // Prepare data for chart
    const chartData = {
        labels: sortedMessages.map(([messageUuid, phoneNumbers]) => messageUuid),
        datasets: [{
            label: 'Message Popularity',
            data: sortedMessages.map(([_, phoneNumbers]) => phoneNumbers.size),
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Adjust color as needed
            borderColor: 'rgba(75, 192, 192, 1)', // Adjust color as needed
            borderWidth: 1
        }]
    };

    // Define time options for the x-axis
    const timeOptions = {
        unit: 'day',
        displayFormats: {
            day: 'MMMM' // Default to month format
        }
    };

    // Adjust time options based on activeNav
    if (activeNav === 2) {
        timeOptions.unit = 'day';
        timeOptions.displayFormats = {
            day: 'dddd' // Week format
        };
    } else if (activeNav === 3) {
        timeOptions.unit = 'hour';
        timeOptions.displayFormats = {
            hour: 'HH:00' // Day format
        };
    }

    // Render the chart
    React.useEffect(() => {
        if (window.Chart) {
            const ctx = document.getElementById('messagePopularityChart');
            new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: timeOptions // Use time options here
                        }
                    }
                }
            });
        }
    }, [chartData, activeNav]);

    return (
        <div>
            <canvas id="messagePopularityChart"></canvas>
        </div>
    );
};

export default MessagePopularity;
