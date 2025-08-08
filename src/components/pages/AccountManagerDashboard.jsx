import React from 'react';
import { useAppData } from '../../context/AppContext';
import { PlusIcon } from '../../assets/icons';

const AccountManagerDashboard = ({ onNavigate, onOpenCandidate }) => {
    const { candidates, clients, jobs } = useAppData();

    // # INTEGRATE: This logic would be replaced by API calls with query parameters.
    // e.g., fetch('/api/candidates?status=Pending ACM Review')
    const profilesForReview = candidates
        .filter(c => c.pipelineStatus === "Pending ACM Review")
        .map(c => {
            const job = jobs.find(j => j.id === c.associatedJobId);
            return { ...c, clientName: job?.client || 'N/A' };
        });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">Account Manager Dashboard</h2>
                <button onClick={() => onNavigate("clients")} className="flex items-center gap-2 bg-teal-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-teal-700">
                    <PlusIcon /> Post New Job
                </button>
            </div>
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg border"><p className="text-sm text-slate-600">Active Clients</p><p className="text-3xl font-bold">{clients.length}</p></div>
                <div className="bg-white p-4 rounded-lg border"><p className="text-sm text-slate-600">My Open Jobs</p><p className="text-3xl font-bold">{jobs.filter(j=>j.status === 'Open').length}</p></div>
                <div className="bg-white p-4 rounded-lg border"><p className="text-sm text-slate-600">Avg. Client Satisfaction</p><p className="text-3xl font-bold">92%</p></div>
            </div>

            {/* Profiles Awaiting Review */}
            <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-semibold text-slate-800 mb-4">Profiles Awaiting Your Review ({profilesForReview.length})</h3>
                {profilesForReview.length > 0 ? (
                    profilesForReview.map(c => (
                        <div key={c.id} className="p-3 bg-slate-50 rounded-md flex justify-between items-center cursor-pointer hover:bg-slate-100 mb-2">
                            <div onClick={() => onOpenCandidate(c.id)} className="flex-grow">
                                <p className="font-bold text-slate-700">{c.name}</p>
                                <p className="text-sm text-slate-500">For: {c.role} at <span className="font-medium">{c.clientName}</span></p>
                            </div>
                            <button onClick={() => onOpenCandidate(c.id)} className="px-3 py-1 bg-teal-500 text-white text-sm rounded-md hover:bg-teal-600">Review</button>
                        </div>
                    ))
                ) : <div className="text-center py-10 text-slate-500">No profiles are awaiting your review.</div>}
            </div>
        </div>
    );
};

export default AccountManagerDashboard;