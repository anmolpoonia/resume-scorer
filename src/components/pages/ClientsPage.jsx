import React from 'react';
import { useAppData } from '../../context/AppContext';

const ClientsPage = ({ onNavigate }) => {
    const { clients } = useAppData();

    return (
        <div className="bg-white rounded-lg border">
            <div className="p-4 border-b">
                <h2 className="text-lg font-bold text-slate-900">Clients</h2>
            </div>
            <div className="divide-y">
                {clients.map(client => (
                    <div key={client.id} onClick={() => onNavigate('clientDetail', { clientId: client.id })} className="p-4 grid grid-cols-2 gap-4 items-center hover:bg-teal-50 cursor-pointer">
                        <div className="font-bold text-teal-700">{client.name}</div>
                        <div className="text-sm text-slate-600">{client.contacts.length} Contacts</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClientsPage;