import { User } from '@/types';

const USERS_KEY = 'maniacookies_users';
const CURRENT_USER_KEY = 'maniacookies_current_user';

export const register = (username: string, email: string, password: string, telefone?: string, cpf?: string): boolean => {
  const users = getUsers();

  if (users.find(u => u.email === email || u.username === username)) {
    return false;
  }

  const newUser: User & { password: string } = {
    id: Date.now().toString(),
    username,
    email,
    telefone,
    cpf,
    password,
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true;
};

export const login = (usernameOrEmail: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(
    u => (u.email === usernameOrEmail || u.username === usernameOrEmail) && u.password === password
  );

  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  }

  return null;
};

export const logout = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem(CURRENT_USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

export const hasCPFDiscount = (): boolean => {
  const user = getCurrentUser();
  return !!user?.cpf;
};

export const calculateDiscount = (total: number): number => {
  return hasCPFDiscount() ? total * 0.1 : 0; // 10% discount with CPF
};

const getUsers = (): (User & { password: string })[] => {
  const usersStr = localStorage.getItem(USERS_KEY);
  return usersStr ? JSON.parse(usersStr) : [];
};
