import { useState, useEffect } from 'react';

type User = { id: string; email: string; name: string; password: string };

export const USERS: User[] = [
  { id: 'user-1', email: 'manager@pizzashop.com', name: 'Joe Manager', password: 'password123' }
];

let currentUser: User | null = null;

export function signIn(email: string, password: string) {
  const u = USERS.find(x => x.email === email && x.password === password) || null;
  currentUser = u;
  return u;
}

export function signUp(name: string, email: string, password: string) {
  const id = cryptoRandomId();
  const u = { id, name, email, password };
  USERS.push(u);
  currentUser = u;
  return u;
}

export function signOut() {
  currentUser = null;
}

export function getCurrentUser() {
  return currentUser;
}

// small hook for demo auth state
export function useAuthState() {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, []);
  return { user, loading, setUser };
}

// simple id
function cryptoRandomId() {
  return 'id-' + Math.random().toString(36).slice(2, 9);
}
