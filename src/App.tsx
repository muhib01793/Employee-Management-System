import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const EmployeesPage = lazy(() => import('./pages/EmployeesPage'));
const DepartmentsPage = lazy(() => import('./pages/DepartmentsPage'));
export default function App() {
 return <Suspense fallback={<div className="state-card">Loading page…</div>}><Routes>
  <Route path="/login" element={<LoginPage/>}/>
  <Route element={<ProtectedRoute/>}><Route element={<Layout/>}><Route index element={<DashboardPage/>}/><Route path="/employees" element={<EmployeesPage/>}/><Route path="/employees/new" element={<EmployeesPage/>}/><Route path="/departments" element={<DepartmentsPage/>}/></Route></Route>
  <Route path="*" element={<Navigate to="/" replace/>}/>
 </Routes></Suspense>;
}
