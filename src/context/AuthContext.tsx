import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { User } from '../types';
interface AuthContextValue { user: User | null; login: (email: string, password: string) => boolean; logout: () => void; }
const AuthContext = createContext<AuthContextValue | undefined>(undefined);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('peopleflow_user'); return stored ? JSON.parse(stored) as User : null;
  });
  const value = useMemo<AuthContextValue>(() => ({
    user,
    login: (email, password) => {
      if (email.toLowerCase() !== 'admin@peopleflow.com' || password !== 'Admin123!') return false;
      const next = { email, name: 'PeopleFlow Admin' }; localStorage.setItem('peopleflow_user', JSON.stringify(next)); setUser(next); return true;
    },
    logout: () => { localStorage.removeItem('peopleflow_user'); setUser(null); }
  }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
