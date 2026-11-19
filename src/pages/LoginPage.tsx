import { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
export default function LoginPage() {
  const { user, login } = useAuth(); const navigate = useNavigate(); const location = useLocation();
  const [email,setEmail] = useState('admin@peopleflow.com'); const [password,setPassword] = useState('Admin123!');
  if (user) return <Navigate to="/" replace/>;
  const submit = (event: React.FormEvent) => { event.preventDefault(); if (login(email,password)) { toast.success('Welcome to PeopleFlow'); navigate(location.state?.from?.pathname || '/', {replace:true}); } else toast.error('Invalid email or password'); };
  return <div className="login-page"><div className="login-card"><div className="brand login-brand"><span className="brand-mark">P</span> PeopleFlow</div><div className="login-heading"><span className="eyebrow">HR MANAGEMENT PORTAL</span><h1>Welcome back</h1><p>Sign in to manage your people and teams.</p></div><form onSubmit={submit}><label className="field">Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label><label className="field">Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label><button className="btn btn-primary login-submit">Sign in</button></form><p className="demo-hint">Demo: admin@peopleflow.com / Admin123!</p></div></div>;
}
