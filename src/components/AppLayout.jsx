import React, { useState } from 'react';
import { CloseIcon, NotificationIcon, SearchIcon, LogoutIcon, DashboardIcon, JobsIcon, ApplicantsIcon, ClientsIcon, UsersIcon, AuditIcon, PerformanceIcon, HistoryIcon } from '../assets/icons';
import AccountManagerDashboard from './pages/AccountManagerDashboard';
import ClientsPage from './pages/ClientsPage';
import ClientDetailPage from './pages/ClientDetailPage';
import CandidateProfileModal from './modals/CandidateProfileModal';

// This is a simplified layout for the Account Manager role as requested
const AppLayout = ({ user, onLogout }) => {
  const [activePage, setActivePage] = useState("dashboard");
  const [pageContext, setPageContext] = useState(null);
  const [candidateForEvaluation, setCandidateForEvaluation] = useState(null);
  const { candidates, jobs } = useAppData(); // Simplified for clarity

  const handleNavigate = (page, context = null) => {
    setActivePage(page);
    setPageContext(context);
  };
  
  const handleOpenCandidate = (candidateId) => {
      // # INTEGRATE: In a real app, you might fetch the full candidate+job details here
      // if they aren't already loaded.
      const candidate = candidates.find((c) => c.id === candidateId);
      const job = jobs.find(j => j.id === candidate.associatedJobId);
      setCandidateForEvaluation({ ...candidate, job });
  };

  const navConfig = {
    account_manager: [
        { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
        { id: "clients", label: "Clients", icon: <ClientsIcon /> },
        { id: "jobs", label: "Jobs", icon: <JobsIcon /> },
    ],
    // # INTEGRATE: Add navigation configurations for other user roles here.
  };

  const renderPage = () => {
    const pageProps = {
      user,
      onNavigate: handleNavigate,
      onOpenCandidate: handleOpenCandidate,
      context: pageContext,
    };
    
    switch (activePage) {
      case "dashboard":
        return <AccountManagerDashboard {...pageProps} />;
      case "clients":
        return <ClientsPage {...pageProps} />;
      case "clientDetail":
        return <ClientDetailPage {...pageProps} />;
      default:
        return <div>Page not found</div>;
    }
  };
  
  const getInitials = (name) => name ? (name.split(' ').length > 1 ? name.split(' ')[0][0] + name.split(' ')[1][0] : name.substring(0, 2)) : '';

  return (
    <div className="flex h-screen w-screen bg-slate-50 font-sans">
      {candidateForEvaluation && (
        <CandidateProfileModal
          candidate={candidateForEvaluation}
          onClose={() => setCandidateForEvaluation(null)}
          user={user}
        />
      )}
      <aside className="w-64 bg-white border-r border-slate-200 p-4 flex-shrink-0 flex flex-col">
        {/* Sidebar Content */}
        <div>
          <h1 className="text-xl font-bold text-slate-800 px-2">Gray Matter</h1>
          <p className="text-xs text-slate-400 px-2 -mt-1">by Buxton Consulting</p>
        </div>
        <nav className="mt-8 space-y-1 flex-grow">
          {(navConfig[user.role] || []).map((item) => (
            <a
              key={item.id}
              href="#"
              onClick={(e) => { e.preventDefault(); handleNavigate(item.id); }}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activePage === item.id || (activePage === 'clientDetail' && item.id === 'clients')
                  ? "bg-teal-50 text-teal-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.icon} {item.label}
            </a>
          ))}
        </nav>
        <div className="border-t border-slate-200 pt-4 mt-4">
          <button onClick={onLogout} className="w-full p-2 text-sm text-slate-500 hover:bg-slate-100 rounded-md text-left flex items-center gap-2">
            <LogoutIcon /> Log Out
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        {/* Header Content */}
        <header className="flex items-center justify-between p-4 border-b bg-white">
          <div/>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                {getInitials(user.name)}
              </div>
              <div>
                <p className="font-semibold text-sm text-slate-800">{user.name}</p>
                <p className="text-xs text-slate-500 capitalize">{user.role.replace(/_/g, " ")}</p>
              </div>
            </div>
          </div>
        </header>
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">{renderPage()}</div>
      </main>
    </div>
  );
};

export default AppLayout;