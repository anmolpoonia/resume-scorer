import React, { useState } from 'react';

const AddContactModal = ({ onClose, onSave }) => {
    const [contact, setContact] = useState({ name: "", position: "", email: "" });
    const handleChange = (e) => setContact({...contact, [e.target.name]: e.target.value});
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // # INTEGRATE: onSave will trigger the context function, which should
        // in turn trigger an API call.
        onSave(contact);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center" onClick={onClose}>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md space-y-4" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold">Add New Contact</h3>
                <input type="text" name="name" value={contact.name} onChange={handleChange} placeholder="Full Name" className="w-full p-2 border rounded" required />
                <input type="text" name="position" value={contact.position} onChange={handleChange} placeholder="Position / Title" className="w-full p-2 border rounded" required />
                <input type="email" name="email" value={contact.email} onChange={handleChange} placeholder="Email Address" className="w-full p-2 border rounded" required />
                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 rounded-md">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-md">Save Contact</button>
                </div>
            </form>
        </div>
    );
};

export default AddContactModal;