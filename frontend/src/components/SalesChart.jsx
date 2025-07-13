import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const chartData = [
  { name: 'Jan', Sales: 4000 },
  { name: 'Feb', Sales: 3000 },
  { name: 'Mar', Sales: 5000 },
  { name: 'Apr', Sales: 4500 },
  { name: 'May', Sales: 6000 },
  { name: 'Jun', Sales: 5500 },
];

const SalesChart = () => {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="name" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1F2937',
            border: '1px solid #374151',
            color: '#F9FAFB'
          }}
          labelStyle={{ color: '#F9FAFB' }}
        />
        <Legend wrapperStyle={{ color: '#F9FAFB' }}/>
        <Line type="monotone" dataKey="Sales" stroke="#3B82F6" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;