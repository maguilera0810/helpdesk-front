import { useCallback, useState } from 'react';

import { User } from '../interfaces/AuthInterfaces';
import UserService from '../services/UserService';

export const useUsers = () => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async (filters: { [key: string]: any } = {}) => {
    setLoading(true);
    setError(null);
    try {
      const userList = await UserService.list(filters);
      setUsers(userList);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (userId: number) => {
    setLoading(true);
    setError(null);
    try {
      const user = await UserService.retrieve(userId);
      setUser(user);
      return user;
    } catch (error) {
      console.error(`Error fetching user with id ${userId}:`, error);
      setError('Error fetching user');
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (user: Partial<User>) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await UserService.create(user);
      setUsers((prevUsers) => [...prevUsers, newUser]);
    } catch (error) {
      console.error('Error creating user:', error);
      setError('Error creating user');
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId: number, user: Partial<User>) => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await UserService.update(userId, user);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === userId ? updatedUser : u))
      );
    } catch (error) {
      console.error(`Error updating user with id ${userId}:`, error);
      setError('Error updating user');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: number) => {
    setLoading(true);
    setError(null);
    try {
      await UserService.destroy(userId);
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
    } catch (error) {
      console.error(`Error deleting user with id ${userId}:`, error);
      setError('Error deleting user');
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    users,
    loading,
    error,
    fetchUsers,
    fetchUser,
    createUser,
    updateUser,
    deleteUser,
  };
};
