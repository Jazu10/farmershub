import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { CategoryScale, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ res, color, label, title }) => {
    useEffect(() => {
        res.length !== 0 &&
            setChartData({
                labels: res.map((i) => i.name),
                datasets: [
                    {
                        label: `${label}`,
                        data: res.map((i) => i.sold),
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.5)",
                            "rgba(54, 162, 235, 0.5)",
                            "rgba(255, 206, 86, 0.5)",
                            "rgba(153, 102, 255, 0.5)",
                            "rgba(255, 159, 64, 0.5)",
                        ],
                        borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)",
                        ],
                        borderWidth: 1,
                    },
                ],
            });
    }, [res]);

    const [chartData, setChartData] = useState({});

    return (
        <div className="mx-auto my-4 w-[80vw] lg:w-[40%] min-h-[400]">
            {Object.keys(chartData).length !== 0 && (
                <Pie
                    data={chartData}
                    options={{
                        width: "100%",
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
                    }}
                />
            )}
        </div>
    );
};

export default PieChart;
