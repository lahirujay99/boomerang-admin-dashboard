import React, { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import EditCustomerModal from '../components/EditCustomerModal';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
     const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);

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

    const handleDelete = async (customerId) => {
        // Show a confirmation dialog before proceeding
        if (!window.confirm("Are you sure you want to delete this customer? This action cannot be undone.")) {
            return;
        }

        try {
            // Call the DELETE endpoint on the backend
            await apiClient.delete(`/customers/${customerId}`);
            
            // On success, update the frontend state to remove the customer from the list
            setCustomers(customers.filter(customer => customer.id !== customerId));
            
        } catch (err) {
            // Handle any errors from the API call
            alert('Failed to delete customer.');
            console.error("Delete error:", err);
        }
    };

     const handleEditClick = (customer) => {
        setEditingCustomer(customer);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCustomer(null);
    };

    const handleSaveCustomer = async (updatedData) => {
        if (!editingCustomer) return;

        try {
            const response = await apiClient.put(`/customers/${editingCustomer.id}`, updatedData);
            const savedCustomer = response.data;

            // Update the customer list with the new data from the backend
            setCustomers(prevCustomers => 
                prevCustomers.map(c => c.id === savedCustomer.id ? savedCustomer : c)
            );
            handleCloseModal(); // Close the modal on success

        } catch (err) {
            alert('Failed to update customer.');
            console.error("Update error:", err);
        }
    };
    
    if (isLoading) return <p className="text-text-secondary">Loading customers...</p>;
    if (error) return <p className="text-red-400">{error}</p>;

    return (
        <div>
            {isModalOpen && (
                <EditCustomerModal
                    customer={editingCustomer}
                    onClose={handleCloseModal}
                    onSave={handleSaveCustomer}
                />
            )}

            <h1 className="text-3xl font-bold text-text-primary mb-6">Customer Management</h1>
            <div className="overflow-hidden rounded-lg border border-border-color bg-bg-secondary">
                <table className="min-w-full divide-y divide-border-color">
                    {/* Table Header */}
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
                                    {/* ** UPDATE THE EDIT BUTTON'S onClick ** */}
                                    <button onClick={() => handleEditClick(customer)} className="text-text-secondary hover:text-accent-primary">
                                        <PencilIcon className="h-5 w-5"/>
                                    </button>
                                    <button onClick={() => handleDelete(customer.id)} className="ml-4 text-text-secondary hover:text-status-cancelled">
                                        <TrashIcon className="h-5 w-5"/>
                                    </button>
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