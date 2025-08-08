import React, { useState } from 'react';
import { useAppData } from '../../context/AppContext';
import { ArrowLeftIcon, PlusIcon, EditIcon } from '../../assets/icons';
import AddContactModal from '../modals/AddContactModal';

const ClientDetailPage = ({ onNavigate, context }) => {
  const { clients, people, jobs, addContact } = useAppData();
  const [showAddContact, setShowAddContact] = useState(false);

  // # INTEGRATE: In a real app, you would fetch this specific client by ID
  // e.g., const { data: client, isLoading } = useQuery(['client', context.clientId], () => fetch(`/api/clients/${context.clientId}`).then(res => res.json()));
  const client = clients.find((c) => c.id === context.clientId);
  
  if (!client) return <div>Client not found.</div>;
  
  const clientJobs = jobs.filter((j) => j.clientId === context.clientId);
  
  const handleSaveContact = (contactData) => {
    // This function now calls the context method
    addContact(client.id, contactData);
    setShowAddContact(false);
  };

  return (
    <div>
      {showAddContact && <AddContactModal onClose={() => setShowAddContact(false)} onSave={handleSaveContact} />}
      <button onClick={() => onNavigate("clients")} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-4">
        <ArrowLeftIcon /> Back to All Clients
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-slate-900">{client.name}</h2>
              <button onClick={() => setShowAddContact(true)} className="flex items-center gap-2 text-sm p-2 rounded-md bg-teal-600 text-white hover:bg-teal-700">
                <PlusIcon /> Add Contact
              </button>
            </div>
            <div className="mt-4 space-y-4">
                {client.contacts.map(contact => {
                    const person = people.find(p => p.personId === contact.personId);
                    return (
                        <div key={contact.contactId} className="p-3 border rounded-md flex justify-between items-center group">
                            <div>
                                <p className="font-semibold">{person?.name}</p>
                                <p className="text-sm text-slate-500">{contact.position}</p>
                            </div>
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded font-semibold hover:bg-teal-200">Add Job</button>
                        </div>
                    )
                })}
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-semibold mb-4">Client Notes</h3>
          {/* # INTEGRATE: This should be a controlled component that calls an API on blur or via a save button */}
          <textarea defaultValue={client.notes} className="w-full h-48 p-2 border rounded-md text-sm bg-slate-50"></textarea>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailPage;