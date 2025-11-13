import { User } from '@/types';
import { authApi } from './api';

const CURRENT_USER_KEY = 'maniacookies_current_user';

export const register = async (username: string, email: string, password: string, telefone?: string, cpf?: string): Promise<boolean> => {
  try {
    const user = await authApi.register({
      username,
      email,
      password,
      telefone: telefone || '',
      cpf,
    });

    // Salvar o usuário no localStorage após o registro bem-sucedido
    const userToSave: User = {
      id: user.id,
      username: user.username,
      email: user.email,
      telefone: user.telefone,
      cpf: user.cpf,
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userToSave));
    return true;
  } catch (error) {
    console.error('Erro ao registrar:', error);
    return false;
  }
};

export const login = async (usernameOrEmail: string, password: string): Promise<User | null> => {
  try {
    const user = await authApi.login({
      usernameOrEmail,
      password,
    });

    const userToSave: User = {
      id: user.id,
      username: user.username,
      email: user.email,
      telefone: user.telefone,
      cpf: user.cpf,
    };

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userToSave));
    return userToSave;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return null;
  }
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
