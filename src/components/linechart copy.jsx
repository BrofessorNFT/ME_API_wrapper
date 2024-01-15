"use client"
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useCallback ,useState, useEffect } from 'react';
import { getCollectionFromME } from '@/lib/actions';
import zoomPlugin from 'chartjs-plugin-zoom'
import { Chart, registerables } from 'chart.js';
// import * as zoom from 'chartjs-plugin-zoom'
Chart.register(...registerables, zoomPlugin);

const LineChart = ({ ticker, label }) => {
    // Convert time to seconds from the first value
    // let timeData, fpData;
    // console.log(data)
    const [fpData , setFpData ] = useState([])
    const [lcData , setLcData ] = useState([])
    const [timeData , setTimeData ] = useState([])
    const [chartInstance, setChartInstance] = useState(null);

    const saveZoomState = (chart) => {
        if (!chart || !chart.scales.x) return null;
        console.log(chart.scales.x.min,)
        return {
            xMin: chart.scales.x.min,
            xMax: chart.scales.x.max,
        };
    };
    const restoreZoomState = (chart, zoomState) => {
        if (!chart || !zoomState || !chart.scales.x) return;
        chart.scales.x.min = zoomState.xMin;
        chart.scales.x.max = zoomState.xMax;
        console.log(chart.scales.x.min)
        chart.update();
    };

    const updateChart = useCallback(() => {
        const savedZoomState = saveZoomState(chartInstance);

        // Update your chart data here

        restoreZoomState(chartInstance, savedZoomState);
    }, [chartInstance]);

    let localStartTime
    useEffect(() => {
        let intervalId;
        const fetchData = async () => {
            try {
                const {fp, lc, time} = await getCollectionFromME(ticker);
                
                if (!localStartTime) {

                    localStartTime = new Date(time).getTime();
                    // setStartTime(localStartTime);
                }

                const timeDifference = (new Date(time).getTime() - localStartTime) / 1000;
                
                setFpData(prevData => [...prevData, fp/ 1e9]);
                setTimeData(prevData => [...prevData, parseInt(timeDifference)])
                setLcData((prevData => [...prevData, lc]))
                // console.log(fp,lc,time, ticker)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        
        fetchData()
        // intervalId = setInterval(fetchData, 3000);
        intervalId = setInterval(() => {
            fetchData();
            updateChart();
        }, 3000);


        return () => {
            clearInterval(intervalId);
            setFpData([])
            setTimeData([])
            setLcData([])

        }
        },[ticker, localStartTime, updateChart])

    // Chart data
        const chartData = {
            labels: timeData,
            datasets: [
                {
                    label: "FP",
                    data: fpData,
                    fill: false,
                    backgroundColor: 'rgb(75, 192, 192)',
                    borderColor: 'rgba(75, 192, 192, 0.6)',
                    yAxisID: 'y-fp', // Link to the first y-axis
                },
                {
                    label: "Listings",
                    data: lcData,
                    fill: false,
                    backgroundColor: 'rgb(204, 0, 204)',
                    borderColor: 'rgba(204, 0, 204, 0.6)',
                    yAxisID: 'y-lc', // Link to the second y-axis
                },
            ],
        };
        
        // Chart options
        const options = {
            responsive: true,

            // zoom: {
            //     enabled: true,
            //     mode: 'x',
            //   },
            //   pan: {
            //     enabled: true,
            //     mode: 'x',
            //   },
            elements: {
                line: {
                    borderWidth: 2 // Adjust line thickness if desired
                },
                point: {
                    borderWidth: 1, // Adjust point border thickness if desired
                    radius: 3 // Adjust point radius if desired
                }
            },
            plugins: {

                zoom: {
                    zoom: {
                      wheel: {
                        enabled: true, // Enable zooming with mouse wheel
                      },
                      pinch: {
                        enabled: true, // Enable zooming with pinch gestures
                      },
                      mode: 'xy', // Zoom both x and y axes
                    },
                    pan: {
                      enabled: true, // Enable panning
                      mode: 'xy', // Pan both x and y axes
                    },
                  },

                legend: {
                    labels: {
                        color: 'white', // White color for legend labels
                        padding: 5 // Add padding above the legend
                    }
                },
            },
            scales: {
                'y-fp': { // First y-axis
                    type: 'linear',
                    position: 'left',
                    title: {
                        display: true,
                        text: 'FP',
                        color: 'white' 
                    },
                    ticks: {
                        color: 'white' //
                    },
                    border: { color: 'rgba(160, 160, 160, 0.9)' },
                    grid: {
                        drawOnChartArea: false,
                        color: 'rgba(255, 255, 255, 0.9)', // only want the grid lines for one axis to show up
                    },
                },
                'y-lc': { // Second y-axis
                    type: 'linear',
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Listings',
                        color: 'white' 
                    },
                    border: { color: 'rgba(160, 160, 160, 0.9)' },
                    // To ensure that the grid lines from this axis do not interfere with the first axis
                    grid: {
                        drawOnChartArea: false,
                        color: 'rgba(255, 255, 255, 0.9)', // only want the grid lines for one axis to show up
                    },
                    ticks: {
                        color: 'white' //
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time, sec',
                        color: 'white' 
                    },
                    border: { color: 'rgba(160, 160, 160, 0.9)' },
                    ticks: {
                        color: 'white' //
                    },
                    grid: {
                        drawOnChartArea: false,
                        color: 'rgba(255, 255, 255, 0.9)', // only want the grid lines for one axis to show up
                    },
                },
            },
        };


    return <div className= "flex w-full h-full flex-col py-5">
        <button className='py-5' > Tracking collection: {label}</button>
        <Line className = "w-full min-w-0 h-full" data={chartData} options={options} ref={setChartInstance} />
    </div>;
};

export default LineChart;