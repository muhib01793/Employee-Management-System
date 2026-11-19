import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Building2, LogOut, Menu, X, UserCircle } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
export default function Layout() {
  const { user, logout } = useAuth(); const navigate = useNavigate(); const [open, setOpen] = useState(false);
  const links = [{to:'/',label:'Dashboard',icon:<LayoutDashboard size={18}/>},{to:'/employees',label:'Employees',icon:<Users size={18}/>},{to:'/departments',label:'Departments',icon:<Building2 size={18}/>}];
  const signOut = () => { logout(); navigate('/login'); };
  return <div className="app-shell">
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}><div className="brand"><span className="brand-mark">P</span> PeopleFlow</div><p className="nav-caption">WORKSPACE</p><nav>{links.map(link => <NavLink key={link.to} to={link.to} end onClick={() => setOpen(false)}>{link.icon}{link.label}</NavLink>)}</nav><div className="sidebar-bottom"><div className="profile"><UserCircle size={34}/><div><strong>{user?.name}</strong><small>Administrator</small></div></div><button className="logout" onClick={signOut}><LogOut size={17}/> Sign out</button></div></aside>
    {open && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setOpen(false)}/>}
    <main className="main-area"><header className="topbar"><button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button><div><span className="topbar-eyebrow">PEOPLE OPERATIONS</span><strong>Employee Management</strong></div><div className="topbar-user"><span>Welcome back</span><b>{user?.name}</b></div></header><div className="page-content"><Outlet/></div></main>
  </div>;
}
