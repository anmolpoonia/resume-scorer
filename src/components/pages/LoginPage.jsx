import React, { useState } from 'react';
import { MOCK_USERS_DB } from '../../data/users';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    // # INTEGRATE: Replace this mock validation with an API call to your authentication endpoint.
    // const response = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    // if (response.ok) {
    //   const { user, token } = await response.json();
    //   // Save token and call onLogin(user)
    //   onLogin(user);
    // } else {
    //   setError("Invalid credentials.");
    // }
    const user = MOCK_USERS_DB.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (user && password === "password") { // Using a simple hardcoded password for demo
      onLogin(user);
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 h-full bg-slate-900 flex flex-col justify-between p-12 text-white">
        <div>
          <h1 className="text-3xl font-bold">Gray Matter</h1>
          <p className="text-slate-400">by Buxton Consulting</p>
        </div>
        <div>
          <p className="text-4xl font-bold leading-tight">Transform Recruitment into a Strategic Advantage.</p>
        </div>
        <div/>
      </div>
      <div className="w-1/2 h-full bg-slate-50 flex items-center justify-center">
        <div className="w-full max-w-sm p-8">
          <div className="text-left mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
            <p className="text-sm text-slate-500">Sign in to continue to Gray Matter</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Form inputs and button */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm"/>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
              <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm"/>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700">Sign In</button>
          </form>
          <div className="mt-6 p-4 bg-slate-100 rounded-lg text-xs text-slate-600">
            <h4 className="font-semibold mb-2">Demo Credentials:</h4>
            {MOCK_USERS_DB.map((user) => (<p key={user.id}><strong>Email:</strong> {user.email}</p>))}
            <p className="mt-1"><strong>Password (for all):</strong> password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;