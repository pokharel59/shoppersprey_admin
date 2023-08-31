"use client"
import React, { useEffect } from 'react';
import ApexCharts from 'react-apexcharts';

const MonthlyOrdersAreaChart = () => {
    const chartOptions = {
        series: [{
            name: 'Inflation',
            data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
        }],
        chart: {
            width: '100%',
            height: 350,
            type: 'area', // Changed the chart type to "area"
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false // Hide the default toolbar
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            labels: {
                style: {
                    colors: '#000000' // Set the x-axis labels color to white
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#000000' // Set the y-axis labels color to white
                }
            }
        },
        title: {
            text: 'Monthly Orders',
            align: 'center',
            style: {
                color: '#000000' // Set the title text color to white
            }
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Code that uses the window object, if needed
        }
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-lg dark:bg-white">
            <div id="area-chart" className="py-2">
                <ApexCharts options={chartOptions} series={chartOptions.series} type="area" height={320} />
            </div>
        </div>
    );
};

export default MonthlyOrdersAreaChart;
