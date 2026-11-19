import { useEffect, useState } from 'react';
import { Building2, Plus, Trash2, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../services/api';
import type { Department, Employee } from '../types';
export default function DepartmentsPage() {
 const [departments,setDepartments]=useState<Department[]>([]); const [employees,setEmployees]=useState<Employee[]>([]); const [loading,setLoading]=useState(true); const [name,setName]=useState(''); const [description,setDescription]=useState('');
 const load=()=>{setLoading(true);Promise.all([api.getDepartments(),api.getEmployees()]).then(([d,e])=>{setDepartments(d);setEmployees(e);}).finally(()=>setLoading(false));};
 useEffect(()=>{load();},[]);
 const add=async(e:React.FormEvent)=>{e.preventDefault();try{await api.createDepartment({name:name.trim(),description:description.trim()});setName('');setDescription('');toast.success('Department created');load();}catch(err){toast.error(err instanceof Error?err.message:'Could not create department');}};
 const remove=async(id:string)=>{if(!window.confirm('Delete this department?'))return;try{await api.deleteDepartment(id);toast.success('Department deleted');load();}catch(err){toast.error(err instanceof Error?err.message:'Could not delete department');}};
 if(loading)return <div className="state-card">Loading departments…</div>;
 return <><div className="page-heading"><div><span className="eyebrow">ORGANIZATION</span><h1>Departments</h1><p>Organize employees into teams and business units.</p></div></div>
 <section className="panel"><div className="panel-heading"><div><h2>Create department</h2><p>Add a new team to your organization.</p></div></div><form className="department-form" onSubmit={add}><label className="field">Department name<input value={name} onChange={e=>setName(e.target.value)} required minLength={2} placeholder="e.g. Customer Success"/></label><label className="field">Description<input value={description} onChange={e=>setDescription(e.target.value)} placeholder="What does this team do?"/></label><button className="btn btn-primary"><Plus size={16}/> Add department</button></form></section>
 <div className="department-grid">{departments.map(d=><article className="department-card" key={d.id}><div className="department-icon"><Building2/></div><div className="department-card-title"><h3>{d.name}</h3><p>{d.description||'No description added'}</p></div><div className="department-meta"><span><Users size={15}/> {employees.filter(e=>e.departmentId===d.id).length} employees</span><button aria-label={`Delete ${d.name}`} onClick={()=>remove(d.id)}><Trash2 size={16}/></button></div></article>)}</div>
 {departments.length===0&&<div className="empty-state">No departments yet. Create your first department above.</div>}</>;
}
