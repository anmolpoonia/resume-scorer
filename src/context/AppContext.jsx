import React, { useState, useEffect, createContext, useContext } from "react";
import { MOCK_JOBS } from '../data/jobs';
import { MOCK_CANDIDATES } from '../data/candidates';
import { MOCK_CLIENTS } from '../data/clients';
import { MOCK_USERS_DB } from '../data/users';
import { MOCK_PEOPLE_DB } from '../data/people';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [people, setPeople] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // # INTEGRATE: Replace this mock loading with API calls to fetch initial data.
    // For example:
    // const fetchData = async () => {
    //   const [jobsRes, candidatesRes, clientsRes] = await Promise.all([
    //     fetch('/api/jobs'),
    //     fetch('/api/candidates'),
    //     fetch('/api/clients')
    //   ]);
    //   setJobs(await jobsRes.json());
    //   setCandidates(await candidatesRes.json());
    //   setClients(await clientsRes.json());
    //   setLoading(false);
    // }
    // fetchData();

    const enrichedJobs = MOCK_JOBS.map(job => {
        const client = MOCK_CLIENTS.find(c => c.id === job.clientId);
        return { ...job, client: client ? client.name : "Unknown Client" };
    });
    
    setJobs(enrichedJobs);
    setCandidates(MOCK_CANDIDATES);
    setClients(MOCK_CLIENTS);
    setUsers(MOCK_USERS_DB);
    setPeople(MOCK_PEOPLE_DB);
    setLoading(false);
  }, []);

  const login = (user) => {
    // # INTEGRATE: This is a mock login. In a real app, this would be handled
    // by your authentication provider after a successful API call.
    setActiveUser(user);
    showToast(`Welcome, ${user.name}!`);
  };

  const logout = () => {
    // # INTEGRATE: This would call your auth provider's logout endpoint.
    setActiveUser(null);
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const updateCandidateStatus = (candidateId, newStatus, actorName) => {
    // # INTEGRATE: Replace with an API call:
    // fetch(`/api/candidates/${candidateId}/status`, {
    //   method: 'PUT',
    //   body: JSON.stringify({ status: newStatus, actor: actorName })
    // }).then(...)
    setCandidates(
      candidates.map((c) =>
        c.id === candidateId
          ? {
              ...c,
              pipelineStatus: newStatus,
              statusHistory: [
                ...c.statusHistory,
                { status: newStatus, date: new Date().toISOString().slice(0, 10), actor: actorName },
              ],
            }
          : c
      )
    );
    showToast(`Status updated to "${newStatus}"`);
  };

  const updateCandidateFeedback = (candidateId, feedback, actorName) => {
    // # INTEGRATE: Replace with an API call:
    // fetch(`/api/candidates/${candidateId}/feedback`, {
    //   method: 'POST',
    //   body: JSON.stringify({ feedback, actor: actorName })
    // }).then(...)
    setCandidates(
      candidates.map((c) =>
        c.id === candidateId ? { ...c, feedback: { ...c.feedback, ...feedback } } : c
      )
    );
    showToast("Feedback submitted successfully!");
  };
  
  const addContact = (clientId, contactData) => {
    // # INTEGRATE: Replace with an API POST request to '/api/clients/{clientId}/contacts'
    // This may involve two steps: checking if the person exists, or creating them, then adding the contact relationship.
    console.log("Adding contact to client:", clientId, contactData);
    showToast("Contact added successfully!");
  };

  const value = {
    activeUser,
    login,
    logout,
    jobs,
    candidates,
    clients,
    users,
    people,
    loading,
    toast,
    updateCandidateStatus,
    updateCandidateFeedback,
    addContact,
    showToast,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error("useAppData must be used within an AppProvider");
  }
  return context;
};