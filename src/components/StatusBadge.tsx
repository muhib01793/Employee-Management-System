import type { EmployeeStatus } from '../types';
export default function StatusBadge({ status }: { status: EmployeeStatus }) {
  return <span className={`status status-${status.toLowerCase().replace(' ', '-')}`}>{status}</span>;
}
