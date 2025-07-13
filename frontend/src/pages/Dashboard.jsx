import React, { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import SalesChart from '../components/SalesChart'; // <-- Import our new chart
// A reusable component for the KPI cards
const StatCard = ({ title, value }) => {
return (
<div className="bg-bg-secondary p-6 rounded-lg shadow-md">
<p className="text-text-secondary text-sm font-medium">{title}</p>
<p className="text-3xl font-bold text-text-primary mt-2">{value}</p>
</div>
);
};
const Dashboard = () => {
const [stats, setStats] = useState(null);
const [error, setError] = useState('');
const [isLoading, setIsLoading] = useState(true);
useEffect(() => {
    const fetchStats = async () => {
        try {
            const response = await apiClient.get('/dashboard/stats');
            setStats(response.data);
        } catch (err) {
            setError('Failed to fetch dashboard stats.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    fetchStats();
}, []);

if (isLoading) {
    return <p className="text-text-secondary">Loading dashboard...</p>;
}

if (error) {
    return <p className="text-red-400">{error}</p>;
}

return (
    <div>
        <h1 className="text-3xl font-bold text-text-primary mb-6">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard title="Total Sales" value={`$${stats?.totalSales.toFixed(2)}`} />
            <StatCard title="Total Bookings" value={stats?.totalBookings} />
            <StatCard title="New Customers (This Month)" value={stats?.newCustomersThisMonth} />
        </div>

        {/* Chart Section - Placeholder is now replaced */}
        <div className="mt-8 bg-bg-secondary rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Sales Revenue</h3>
            <div className="h-80">
                {/* The placeholder is gone, and the real chart is here! */}
                <SalesChart />
            </div>
        </div>
    </div>
);
};
export default Dashboard;