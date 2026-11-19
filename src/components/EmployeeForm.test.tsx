import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import EmployeeForm from './EmployeeForm';
const departments=[{id:'dep-1',name:'Engineering',description:'Builds products'}];
describe('EmployeeForm',()=>{
 it('renders employee fields',()=>{render(<EmployeeForm departments={departments} onSubmit={vi.fn()} onCancel={vi.fn()}/>);expect(screen.getByLabelText('First name')).toBeInTheDocument();expect(screen.getByLabelText('Department')).toBeInTheDocument();});
 it('validates required fields',async()=>{const submit=vi.fn();render(<EmployeeForm departments={departments} onSubmit={submit} onCancel={vi.fn()}/>);fireEvent.click(screen.getByRole('button',{name:'Add employee'}));await waitFor(()=>expect(screen.getByText(/First name must be/)).toBeInTheDocument());expect(submit).not.toHaveBeenCalled();});
});
