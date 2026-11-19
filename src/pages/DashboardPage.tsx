import { useEffect, useState } from 'react';
import { Users, UserCheck, Building2, UserPlus, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Department, Employee } from '../types';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
export default function DashboardPage() {
  const [employees,setEmployees] = useState<Employee[]>([]); const [departments,setDepartments] = useState<Department[]>([]); const [loading,setLoading] = useState(true); const [error,setError] = useState('');
  useEffect(() => { Promise.all([api.getEmployees(),api.getDepartments()]).then(([e,d])=>{setEmployees(e);setDepartments(d);}).catch(()=>setError('Could not load dashboard data.')).finally(()=>setLoading(false)); }, []);
  const recent = [...employees].sort((a,b)=>b.joinDate.localeCompare(a.joinDate)).slice(0,5);
  const departmentName = (id:string) => departments.find(d=>d.id===id)?.name ?? 'Unknown';
  if (loading) return <div className="state-card">Loading dashboard…</div>;
  if (error) return <div className="state-card error-text">{error}</div>;
  return <><div className="page-heading"><div><span className="eyebrow">OVERVIEW</span><h1>Dashboard</h1><p>Here’s what’s happening across your organization.</p></div><Link className="btn btn-primary" to="/employees/new">+ Add employee</Link></div>
    <div className="stats-grid"><StatCard label="Total employees" value={employees.length} icon={<Users/>} tone="blue"/><StatCard label="Active employees" value={employees.filter(e=>e.status==='Active').length} icon={<UserCheck/>} tone="green"/><StatCard label="Departments" value={departments.length} icon={<Building2/>} tone="purple"/><StatCard label="New joiners (30 days)" value={employees.filter(e=>(Date.now()-new Date(e.joinDate).getTime())<=30*86400000).length} icon={<UserPlus/>} tone="orange"/></div>
    <section className="panel"><div className="panel-heading"><div><h2>Recent employees</h2><p>Latest additions to your organization</p></div><Link to="/employees" className="text-link">View all <ArrowUpRight size={15}/></Link></div>
      {recent.length===0 ? <div className="empty-state">No employees yet. Add your first employee.</div> : <div className="table-wrap"><table><thead><tr><th>EMPLOYEE</th><th>DEPARTMENT</th><th>POSITION</th><th>JOINED</th><th>STATUS</th></tr></thead><tbody>{recent.map(e=><tr key={e.id}><td><div className="person-cell"><span className="avatar">{e.firstName[0]}{e.lastName[0]}</span><div><strong>{e.firstName} {e.lastName}</strong><small>{e.email}</small></div></div></td><td>{departmentName(e.departmentId)}</td><td>{e.position}</td><td>{new Date(e.joinDate+'T00:00:00').toLocaleDateString()}</td><td><StatusBadge status={e.status}/></td></tr>)}</tbody></table></div>}
    </section></>;
}
