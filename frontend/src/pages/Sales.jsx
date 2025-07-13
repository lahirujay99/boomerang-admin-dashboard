import React, { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';

// A reusable component for the status pills
const StatusPill = ({ status }) => {
    const baseClasses = "inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-white";
    const statusClasses = {
        COMPLETED: 'bg-status-completed',
        PENDING: 'bg-status-pending',
        CANCELLED: 'bg-status-cancelled',
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};


const Sales = () => {
    const [sales, setSales] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        apiClient.get('/sales')
            .then(response => {
                setSales(response.data);
            })
            .catch(err => {
                setError('Failed to fetch sales data.');
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);
    
    if (isLoading) return <p className="text-text-secondary">Loading sales history...</p>;
    if (error) return <p className="text-red-400">{error}</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-text-primary mb-6">Sales History</h1>
            <div className="overflow-hidden rounded-lg border border-border-color bg-bg-secondary">
                 <table className="min-w-full divide-y divide-border-color">
                    <thead className="bg-bg-tertiary">
                         <tr>
                             <th className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold uppercase text-text-secondary">Customer Name</th>
                             <th className="px-3 py-3.5 text-left text-sm font-semibold uppercase text-text-secondary">Date</th>
                             <th className="px-3 py-3.5 text-left text-sm font-semibold uppercase text-text-secondary">Amount</th>
                             <th className="px-3 py-3.5 text-left text-sm font-semibold uppercase text-text-secondary">Status</th>
                         </tr>
                    </thead>
                    <tbody className="divide-y divide-border-color bg-bg-secondary">
                        {sales.map((sale) => (
                             <tr key={sale.id}>
                                <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm text-text-primary">{sale.customerName}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-text-secondary">{sale.transactionDate}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-text-secondary">${sale.amount.toFixed(2)}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm"><StatusPill status={sale.status} /></td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
            </div>
        </div>
    );
};

export default Sales;