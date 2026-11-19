import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Department, Employee, EmployeeInput } from '../types';

const schema = z.object({
  firstName: z.string().trim().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().trim().min(2, 'Last name must be at least 2 characters'),
  email: z.string().trim().email('Enter a valid email address'),
  phone: z.string().trim().min(7, 'Enter a valid phone number'),
  departmentId: z.string().min(1, 'Select a department'),
  position: z.string().trim().min(2, 'Enter a job title'),
  status: z.enum(['Active', 'On Leave', 'Inactive']),
  joinDate: z.string().min(1, 'Select a joining date')
});
type FormValues = z.infer<typeof schema>;
export default function EmployeeForm({ employee, departments, onSubmit, onCancel }: {
  employee?: Employee; departments: Department[]; onSubmit: (data: EmployeeInput) => Promise<void>; onCancel: () => void;
}) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema), defaultValues: { firstName:'', lastName:'', email:'', phone:'', departmentId:'', position:'', status:'Active', joinDate:new Date().toISOString().slice(0,10) }
  });
  useEffect(() => { if (employee) reset(employee); }, [employee, reset]);
  const field = (name: keyof FormValues, label: string, type = 'text') => (
    <label className="field">{label}
      <input type={type} {...register(name)} />
      {errors[name] && <small className="field-error">{errors[name]?.message}</small>}
    </label>
  );
  return <form className="employee-form" onSubmit={handleSubmit(onSubmit)}>
    <div className="form-grid">
      {field('firstName','First name')}{field('lastName','Last name')}
      {field('email','Email address','email')}{field('phone','Phone number','tel')}
      <label className="field">Department<select {...register('departmentId')}><option value="">Select department</option>{departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}</select>{errors.departmentId && <small className="field-error">{errors.departmentId.message}</small>}</label>
      {field('position','Job title')}
      <label className="field">Status<select {...register('status')}><option>Active</option><option>On Leave</option><option>Inactive</option></select></label>
      {field('joinDate','Joining date','date')}
    </div>
    <div className="form-actions"><button type="button" className="btn btn-light" onClick={onCancel}>Cancel</button><button className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Saving…' : employee ? 'Save changes' : 'Add employee'}</button></div>
  </form>;
}
