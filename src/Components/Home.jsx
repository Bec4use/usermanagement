import { Line, Pie } from 'react-chartjs-2';
import { Chart, ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController, LineController, PieController, PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale, RadialLinearScale, TimeScale, TimeSeriesScale, Decimation, Filler, Legend, Title, Tooltip } from 'chart.js';
import axios from 'axios';
import { useEffect, useState } from 'react';

Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
);

const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: 'Sales',
            data: [120, 150, 110, 140, 180, 170, 160, 190, 200, 180, 170, 210],
            borderColor: '#6366F1',
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
        },
    ],
};

const pieData = {
    labels: ['Desktop', 'Tablet', 'Phone'],
    datasets: [
        {
            data: [80, 15, 5],
            backgroundColor: ['#10B981', '#FBBF24', '#F87171'],
        },
    ],
};

const Home = () => {
    const [adminTotal, setAdminTotal] = useState(0);
    const [userTotal, setUserTotal] = useState(0);
    const [departmentTotal, setDepartmentTotal] = useState(0);

    useEffect(() => {
        adminCount();
        userCount();
        departmentCount();
    })
    const adminCount = () => {
        axios.get("http://localhost:3000/api/adminCount", { withCredentials: true })
            .then((result) => {
                if (result.data.Status) {
                    console.log(result.data.data);
                    setAdminTotal(result.data.data);
                } else {
                    alert(result.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const userCount = () => {
        axios.get("http://localhost:3000/api/userCount", { withCredentials: true })
            .then((result) => {
                if (result.data.Status) {
                    console.log(result.data.data);
                    setUserTotal(result.data.data);
                } else {
                    alert(result.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const departmentCount = () => {
        axios.get("http://localhost:3000/api/departmentCount", { withCredentials: true })
            .then((result) => {
                if (result.data.Status) {
                    console.log(result.data.data);
                    setDepartmentTotal(result.data.data);
                } else {
                    alert(result.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <div className="bg-gray-200 text-white p-6 rounded-lg shadow-lg">
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-gray-400">TOTAL ACCOUNT</p>
                    <div className="flex items-center">
                        <span className="text-2xl font-bold">{adminTotal}</span>
                        <span className="ml-2 text-green-500">
                            <i className="fas fa-arrow-down"></i> User
                        </span>
                    </div>
                    <p className="text-gray-400">Since last month</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-gray-400">TOTAL CUSTOMERS</p>
                    <div className="flex items-center">
                        <span className="text-2xl font-bold">{userTotal}</span>
                        <span className="ml-2 text-green-500">
                            <i className="fas fa-arrow-up"></i> User
                        </span>
                    </div>
                    <p className="text-gray-400">Since last month</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-gray-400">TOTAL DEPARTMENT</p>
                    <div className="flex items-center">
                        <span className="text-2xl font-bold">{departmentTotal}</span>
                    </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-gray-400">TOTAL PROFIT</p>
                    <div className="flex items-center">
                        <span className="text-2xl font-bold">$15k</span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                    <Line data={lineData} options={{ plugins: { legend: { labels: { color: 'rgb(255, 255, 255)' } } } }} />
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                    <Pie data={pieData} options={{ plugins: { legend: { labels: { color: 'rgb(255, 255, 255)' } } } }} />
                </div>
            </div>
        </div>
    );
};

export default Home;