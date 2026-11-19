export type EmployeeStatus = 'Active' | 'On Leave' | 'Inactive';
export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  departmentId: string;
  position: string;
  status: EmployeeStatus;
  joinDate: string;
}
export interface Department { id: string; name: string; description: string; }
export interface EmployeeInput extends Omit<Employee, 'id'> {}
export interface User { email: string; name: string; }
