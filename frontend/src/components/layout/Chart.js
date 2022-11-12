import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

const BarChart = ({ res, color, label, title }) => {
    useEffect(() => {
        res.length !== 0 &&
            setChartData({
                labels: res.map((i) => i.date),
                datasets: [
                    {
                        label: `${label}`,
                        data: res.map((i) => i.amount),
                        backgroundColor: [`${color}`],
                    },
                ],
            });
    }, [res]);

    const [chartData, setChartData] = useState({});

    return (
        <div className="mx-auto mr-10 lg:mr-20 my-4 w-[85%] min-h-[400]">
            {Object.keys(chartData).length !== 0 && (
                <Bar
                    data={chartData}
                    options={{
                        height: "40vh",
                        plugins: {
                            title: {
                                display: true,
                                text: `${title}`,
                            },
                            legend: {
                                display: true,
                                position: "bottom",
                            },
                        },
                        responsive: true,
                    }}
                />
            )}
        </div>
    );
};

export default BarChart;
