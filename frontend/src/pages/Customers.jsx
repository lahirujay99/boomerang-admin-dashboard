import React, { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        apiClient.get('/customers')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(err => {
                setError('Failed to fetch customers.');
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);
    
    if (isLoading) return <p className="text-text-secondary">Loading customers...</p>;
    if (error) return <p className="text-red-400">{error}</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-text-primary mb-6">Customer Management</h1>
            <div className="overflow-hidden rounded-lg border border-border-color bg-bg-secondary">
                <table className="min-w-full divide-y divide-border-color">
                    <thead className="bg-bg-tertiary">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-text-secondary">Full Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-text-secondary">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-text-secondary">Join Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-text-secondary">Total Spend</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-text-secondary">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border-color bg-bg-secondary">
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-text-primary">{customer.fullName}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-text-secondary">{customer.email}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-text-secondary">{customer.joinDate}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-text-secondary">${customer.totalSpend.toFixed(2)}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                    <button className="text-text-secondary hover:text-accent-primary"><PencilIcon className="h-5 w-5"/></button>
                                    <button className="ml-4 text-text-secondary hover:text-status-cancelled"><TrashIcon className="h-5 w-5"/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Customers;