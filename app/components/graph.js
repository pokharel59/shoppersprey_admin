import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';

const MonthlyOrdersAreaChart = ({ orderData }) => {
    const [seriesData, setSeriesData] = useState(Array(12).fill(0));

    const chartOptions = {
        series: [{
            name: 'Orders',
            data: seriesData
        }],
        chart: {
            width: '100%',
            height: 350,
            type: 'area',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
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
        // Calculate the data for the chart based on orderData
        if (orderData && orderData.length > 0) {
            const monthlyData = Array(12).fill(0);

            orderData.forEach((order) => {
                const orderMonth = new Date(order.date).getMonth();
                monthlyData[orderMonth] += 1; // You can adjust this based on your data
            });

            setSeriesData(monthlyData);
        }
    }, [orderData]);

    return (
        <div className="bg-white rounded-lg shadow-lg dark:bg-white">
            <div id="area-chart" className="py-2">
                <ApexCharts options={chartOptions} series={chartOptions.series} type="area" height={320} />
            </div>
        </div>
    );
};

export default MonthlyOrdersAreaChart;
