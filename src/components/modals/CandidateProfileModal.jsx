import React, { useState } from 'react';
import { useAppData } from '../../context/AppContext';
import { CloseIcon } from '../../assets/icons';

const CandidateProfileModal = ({ candidate, onClose, user }) => {
  const { updateCandidateStatus, updateCandidateFeedback } = useAppData();
  const [acmNotes, setAcmNotes] = useState("");

  if (!candidate) return null;

  const handleManagerSubmit = (newStatus) => {
    // # INTEGRATE: These two functions would be combined into a single API call
    // that updates both feedback and status atomically on the backend.
    updateCandidateFeedback(candidate.id, { manager: acmNotes }, user.name);
    updateCandidateStatus(candidate.id, newStatus, user.name);
    onClose();
  };

  const FeedbackSection = ({ title, notes }) => (
    <div>
        <p className="font-semibold">{title}:</p>
        <p className="text-sm text-slate-600 p-2 bg-slate-50 rounded mt-1">{notes || "No feedback submitted."}</p>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-slate-50 rounded-lg shadow-xl w-full max-w-6xl m-4 h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b flex justify-between items-center bg-white rounded-t-lg">
          <div>
            <h3 className="text-xl font-bold text-slate-800">{candidate.name}</h3>
            <p className="text-slate-500">{candidate.role} for <span className="font-semibold text-slate-600">{candidate.job.client}</span></p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><CloseIcon /></button>
        </div>
        
        <div className="flex-grow p-4 grid grid-cols-3 gap-4 overflow-hidden">
            <div className="col-span-1 bg-white p-4 rounded-lg border overflow-y-auto">
                <h4 className="font-semibold text-slate-800 mb-2">Job Description</h4>
                <p className="text-sm text-slate-600">{candidate.job.description}</p>
            </div>
            <div className="col-span-1 bg-white p-4 rounded-lg border overflow-y-auto">
                <h4 className="font-semibold text-slate-800 mb-2">Candidate Resume</h4>
                <div className="text-sm text-slate-700"><p>Mock resume viewer for {candidate.name}.pdf</p></div>
            </div>
            <div className="col-span-1 bg-white p-4 rounded-lg border flex flex-col">
                <h4 className="font-semibold text-slate-800 mb-2">Review & Feedback</h4>
                <div className="space-y-4 overflow-y-auto flex-grow">
                    <FeedbackSection title="Recruiter Notes" notes={candidate.feedback.recruiter} />
                    <FeedbackSection title="Technical Reviewer Notes" notes={candidate.feedback.technical} />
                </div>
                {user.role === 'account_manager' && (
                     <div className="space-y-3 pt-4 border-t mt-4">
                         <div>
                             <label className="font-semibold text-sm mb-1 block">Account Manager Notes</label>
                             <textarea value={acmNotes} onChange={e => setAcmNotes(e.target.value)} className="w-full h-24 p-2 border rounded-md" placeholder="Add your feedback..."></textarea>
                         </div>
                         <div className="flex gap-2">
                             <button onClick={() => handleManagerSubmit("Pending Client Review")} className="w-full text-sm p-2 rounded-md bg-green-100 hover:bg-green-200 text-green-800 font-semibold">Send to Client</button>
                             <button onClick={() => handleManagerSubmit("Rejected by Account Manager")} className="w-full text-sm p-2 rounded-md bg-red-100 hover:bg-red-200 text-red-800 font-semibold">Not Selected</button>
                         </div>
                     </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfileModal;