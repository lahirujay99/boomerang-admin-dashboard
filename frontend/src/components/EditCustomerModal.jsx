import React, { useState } from 'react';

const EditCustomerModal = ({ customer, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        fullName: customer.fullName,
        email: customer.email,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        onSave(formData); // Pass the updated data up to the parent component
    };

    return (
        // The modal backdrop
        <div 
            onClick={onClose} 
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-20"
        >
            {/* The modal content - stop propagation to prevent closing when clicking inside */}
            <div 
                onClick={(e) => e.stopPropagation()} 
                className="bg-bg-secondary p-8 rounded-xl shadow-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-text-primary mb-6">Edit Customer</h2>
                <form onSubmit={handleSave}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                id="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="form-input w-full px-4 py-3 bg-bg-tertiary border-transparent rounded-lg text-text-primary"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-input w-full px-4 py-3 bg-bg-tertiary border-transparent rounded-lg text-text-primary"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-text-primary bg-bg-tertiary hover:bg-border-color">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 rounded-lg text-white bg-accent-primary hover:bg-accent-hover">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCustomerModal;