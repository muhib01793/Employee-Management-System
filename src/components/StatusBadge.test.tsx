import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import StatusBadge from './StatusBadge';
describe('StatusBadge',()=>{it('shows the employee status',()=>{render(<StatusBadge status="Active"/>);expect(screen.getByText('Active')).toBeInTheDocument();});});
