import { beforeEach, describe, expect, it } from 'vitest';
import { api } from './api';
import { seedDepartments, seedEmployees } from '../data/seed';
beforeEach(()=>{localStorage.clear();});
describe('employee API adapter',()=>{
 it('returns seeded employees',async()=>{expect(await api.getEmployees()).toHaveLength(seedEmployees.length);});
 it('creates and deletes an employee',async()=>{const item=await api.createEmployee({firstName:'Test',lastName:'User',email:'test@example.com',phone:'12345678',departmentId:seedDepartments[0].id,position:'Tester',status:'Active',joinDate:'2026-01-01'});expect((await api.getEmployees()).some(e=>e.id===item.id)).toBe(true);await api.deleteEmployee(item.id);expect((await api.getEmployees()).some(e=>e.id===item.id)).toBe(false);});
});
