import type { Department, Employee } from '../types';
export const seedDepartments: Department[] = [
  { id: 'dep-1', name: 'Engineering', description: 'Product engineering and development' },
  { id: 'dep-2', name: 'Human Resources', description: 'People operations and recruitment' },
  { id: 'dep-3', name: 'Marketing', description: 'Brand, growth and communications' },
  { id: 'dep-4', name: 'Finance', description: 'Accounting and financial planning' }
];
export const seedEmployees: Employee[] = [
  { id:'emp-1', firstName:'Ayesha', lastName:'Khan', email:'ayesha.khan@example.com', phone:'+92 300 1112233', departmentId:'dep-1', position:'Frontend Developer', status:'Active', joinDate:'2024-02-12' },
  { id:'emp-2', firstName:'Ahmed', lastName:'Raza', email:'ahmed.raza@example.com', phone:'+92 301 2223344', departmentId:'dep-2', position:'HR Executive', status:'Active', joinDate:'2023-11-06' },
  { id:'emp-3', firstName:'Sara', lastName:'Malik', email:'sara.malik@example.com', phone:'+92 302 3334455', departmentId:'dep-3', position:'Marketing Specialist', status:'On Leave', joinDate:'2024-08-19' },
  { id:'emp-4', firstName:'Usman', lastName:'Ali', email:'usman.ali@example.com', phone:'+92 303 4445566', departmentId:'dep-1', position:'Backend Developer', status:'Active', joinDate:'2025-01-13' },
  { id:'emp-5', firstName:'Hira', lastName:'Shah', email:'hira.shah@example.com', phone:'+92 304 5556677', departmentId:'dep-4', position:'Accountant', status:'Inactive', joinDate:'2022-05-23' },
  { id:'emp-6', firstName:'Bilal', lastName:'Ahmed', email:'bilal.ahmed@example.com', phone:'+92 305 6667788', departmentId:'dep-3', position:'Content Strategist', status:'Active', joinDate:'2025-10-02' },
  { id:'emp-7', firstName:'Maham', lastName:'Iqbal', email:'maham.iqbal@example.com', phone:'+92 306 7778899', departmentId:'dep-2', position:'Talent Partner', status:'Active', joinDate:'2026-01-08' }
];
