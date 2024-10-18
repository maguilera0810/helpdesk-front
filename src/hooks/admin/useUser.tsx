import { useCallback, useState } from 'react';

import { User } from '../../interfaces/ModelInterfaces';
import UserService from '../../services/admin/UserService';
import { methodUser } from '../../types/methodTypes';

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [lightUsers, setLightUsers] = useState<Partial<User>[]>([]);
  const [method, setMethod] = useState<methodUser | undefined>()
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const fetchUsers = useCallback(async (filters: { [key: string]: any } = {}, isLight: boolean = false) => {
    setMethod('fetchUsers');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      if (isLight) {
        setLightUsers(await UserService.listLight(filters));
      } else {
        setUsers(await UserService.list(filters));
      }
      setSuccess(true);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (userId: number) => {
    setMethod('fetchUser');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const user = await UserService.retrieve(userId);
      setUser(user);
      setSuccess(true);
      return user;
    } catch (error) {
      console.error(`Error fetching user with id ${userId}:`, error);
      setError('Error fetching user');
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (user: Partial<User>) => {
    setMethod('createUser');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const newUser = await UserService.create(user);
      setUser(newUser);
      setSuccess(true);
    } catch (error) {
      console.error('Error creating user:', error);
      setError('Error creating user');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId: number, user: Partial<User>) => {
    setMethod('updateUser');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const updatedUser = await UserService.update(userId, user);
      setUser(updatedUser)
      setSuccess(true);
    } catch (error) {
      console.error(`Error updating user with id ${userId}:`, error);
      setError('Error updating user');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: number) => {
    setMethod('deleteUser');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await UserService.destroy(userId);
      setUser(null);
      setSuccess(true);
    } catch (error) {
      console.error(`Error deleting user with id ${userId}:`, error);
      setError('Error deleting user');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    users,
    lightUsers,
    loading,
    error,
    success,
    method,
    fetchUsers,
    fetchUser,
    createUser,
    updateUser,
    deleteUser,
  };
};
