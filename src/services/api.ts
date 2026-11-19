import { seedDepartments, seedEmployees } from '../data/seed';
import type { Department, Employee, EmployeeInput } from '../types';

const delay = (ms = 180) => new Promise(resolve => setTimeout(resolve, ms));
const read = <T,>(key: string, fallback: T): T => {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback; }
  catch { return fallback; }
};
const write = <T,>(key: string, value: T) => localStorage.setItem(key, JSON.stringify(value));
const employeesKey = 'peopleflow_employees';
const departmentsKey = 'peopleflow_departments';

export const api = {
  async getEmployees(): Promise<Employee[]> {
    await delay(); return read(employeesKey, seedEmployees);
  },
  async getEmployee(id: string): Promise<Employee | undefined> {
    await delay(); return (await this.getEmployees()).find(item => item.id === id);
  },
  async createEmployee(input: EmployeeInput): Promise<Employee> {
    await delay();
    const items = read(employeesKey, seedEmployees);
    if (items.some(item => item.email.toLowerCase() === input.email.toLowerCase())) throw new Error('An employee with this email already exists.');
    const employee = { ...input, id: crypto.randomUUID() };
    write(employeesKey, [employee, ...items]); return employee;
  },
  async updateEmployee(id: string, input: EmployeeInput): Promise<Employee> {
    await delay();
    const items = read(employeesKey, seedEmployees);
    if (items.some(item => item.id !== id && item.email.toLowerCase() === input.email.toLowerCase())) throw new Error('An employee with this email already exists.');
    const updated = { ...input, id };
    write(employeesKey, items.map(item => item.id === id ? updated : item)); return updated;
  },
  async deleteEmployee(id: string): Promise<void> {
    await delay(); write(employeesKey, read(employeesKey, seedEmployees).filter(item => item.id !== id));
  },
  async getDepartments(): Promise<Department[]> {
    await delay(); return read(departmentsKey, seedDepartments);
  },
  async createDepartment(input: Omit<Department, 'id'>): Promise<Department> {
    await delay();
    const items = read(departmentsKey, seedDepartments);
    if (items.some(item => item.name.toLowerCase() === input.name.toLowerCase())) throw new Error('Department already exists.');
    const department = { ...input, id: crypto.randomUUID() };
    write(departmentsKey, [...items, department]); return department;
  },
  async deleteDepartment(id: string): Promise<void> {
    await delay();
    const employees = read(employeesKey, seedEmployees);
    if (employees.some(employee => employee.departmentId === id)) throw new Error('Move or remove this department’s employees first.');
    write(departmentsKey, read(departmentsKey, seedDepartments).filter(item => item.id !== id));
  }
};
