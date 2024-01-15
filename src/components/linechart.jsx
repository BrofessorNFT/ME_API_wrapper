"use client"
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useRef,useCallback ,useState, useEffect } from 'react';
import { useSliderContext } from './SharedContext';
import { getCollectionFromME } from '@/lib/actions';
import { Slider } from './ui/slider';
// import * as zoom from 'chartjs-plugin-zoom'




const LineChart = ({ ticker, label }) => {
    const { xmin, xmax ,setXmin,setXmax } = useSliderContext();
    const [fpData , setFpData ] = useState([])
    const [lcData , setLcData ] = useState([])
    const [timeData , setTimeData ] = useState([])
    // const chartRef = useRef(null);
    // const [xmin, setXmin] = useState(null);
    // const [xmax, setXmax] = useState(null);
    // const [xsel1, setXsel1] = useState(0);
    // const [xsel2, setXsel2] = useState(100);

    const TRIM_DATA = 100; // Threshold for data trimming
    const KEEP_LAST = 50; //

    function trimData(data) {
        const trimmed = data.slice(0, data.length - KEEP_LAST).filter((_, index) => index % 5 === 0);
        return trimmed.concat(data.slice(-KEEP_LAST));
        }

    let localStartTime
    useEffect(() => {
        let intervalId;
        const fetchData = async () => {
            try {
                const {fp, lc, time} = await getCollectionFromME(ticker);

                if (!localStartTime) {

                    localStartTime = new Date(time).getTime();

                }

                const timeDifference = (new Date(time).getTime() - localStartTime) / 1000;
                
                // setFpData(prevData => [...prevData, fp/ 1e9]);
                // setTimeData(prevData => [...prevData, Math.round(timeDifference)])
                // setLcData((prevData => [...prevData, lc]))
                setFpData(prevData => {
                    const newData = [...prevData, fp / 1e9];
                    console.log(newData.length)
                    if (newData.length > TRIM_DATA) {
                        console.log("data is bein trimmed")
                        return trimData(newData);
                    }
                    return newData;
                });
            
                setTimeData(prevData => {
                    const newData = [...prevData, Math.round(timeDifference)];
                    if (newData.length > TRIM_DATA) {
                        return trimData(newData);
                    }
                    return newData;
                });
            
                setLcData(prevData => {
                    const newData = [...prevData, lc];
                    if (newData.length > TRIM_DATA) {
                        return trimData(newData);
                    }
                    return newData;
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData()
        // intervalId = setInterval(fetchData, 3000);
        intervalId = setInterval(() => {
            fetchData();
        }, 3000);


        return () => {
            clearInterval(intervalId);
            setFpData([])
            setTimeData([])
            setLcData([])

        }
        },[ticker, localStartTime])

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
                legend: {
                    labels: {
                        // color: 'white', // White color for legend labels
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
                    },
                    border: { color: 'rgba(160, 160, 160, 0.9)' },
                    // To ensure that the grid lines from this axis do not interfere with the first axis
                    grid: {
                        drawOnChartArea: false,
                        color: 'rgba(255, 255, 255, 0.9)', // only want the grid lines for one axis to show up
                    },
                },
                x: {
                    min: Math.floor((xmin*0.01)*timeData.slice(-1)/3)*3,
                    max: Math.floor((xmax*0.01)*timeData.slice(-1)/3)*3,
                    // max: 1002,
                    title: {
                        display: true,
                        text: 'Time, sec',
                    },
                    border: { color: 'rgba(160, 160, 160, 0.9)' },
                    grid: {
                        drawOnChartArea: false,
                        color: 'rgba(255, 255, 255, 0.9)', // only want the grid lines for one axis to show up
                    },
                },
            },
        };


    return <div className= "flex w-full h-full flex-col py-5 border">
        <button className='py-5  text-xl ' > Tracking collection: {ticker}  </button>
        <Line className = "w-full" data={chartData} options={options}/>
        <div>


    </div>
    </div>;
};

export default LineChart;