import { useCallback, useState } from 'react';

import { Role } from '../interfaces/ModelInterfaces';
import RoleService from '../services/admin/RoleService';

export const useRole = () => {
  const [role, setRole] = useState<Role | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [method, setMethod] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const fetchRoles = useCallback(async (filters: { [key: string]: any } = {}) => {
    setMethod('fetchRoles');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const roleList = await RoleService.list(filters);
      setRoles(roleList);
      setSuccess(true);
    } catch (error) {
      console.error('Error fetching roles:', error);
      setError('Error fetching roles');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRole = async (roleId: number) => {
    setMethod('fetchRole');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const role = await RoleService.retrieve(roleId);
      setRole(role);
      setSuccess(true);
      return role;
    } catch (error) {
      console.error(`Error fetching role with id ${roleId}:`, error);
      setError('Error fetching role');
    } finally {
      setLoading(false);
    }
  };

  const createRole = async (role: Partial<Role>) => {
    setMethod('createRole');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const newRole = await RoleService.create(role);
      setRoles((prevRoles) => [...prevRoles, newRole]);
      setSuccess(true);
    } catch (error) {
      console.error('Error creating role:', error);
      setError('Error creating role');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (roleId: number, role: Partial<Role>) => {
    setMethod('updateRole');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const updatedRole = await RoleService.update(roleId, role);
      setRoles((prevRoles) =>
        prevRoles.map((u) => (u.id === roleId ? updatedRole : u))
      );
      setSuccess(true);
    } catch (error) {
      console.error(`Error updating role with id ${roleId}:`, error);
      setError('Error updating role');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const deleteRole = async (roleId: number) => {
    setMethod('deleteRole');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await RoleService.destroy(roleId);
      setRoles((prevRoles) => prevRoles.filter((u) => u.id !== roleId));
      setSuccess(true);
    } catch (error) {
      console.error(`Error deleting role with id ${roleId}:`, error);
      setError('Error deleting role');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    role,
    roles,
    loading,
    error,
    success,
    method,
    fetchRoles,
    fetchRole,
    createRole,
    updateRole,
    deleteRole,
  };
};
