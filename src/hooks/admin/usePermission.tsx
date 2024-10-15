import { useCallback, useState } from 'react';

import { Permission } from '../../interfaces/ModelInterfaces';
import PermissionService from '../../services/admin/PermissionService';

export const usePermission = () => {
  const [permission, setPermission] = useState<Permission | undefined>(undefined);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [method, setMethod] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const fetchPermissions = useCallback(async (filters: { [key: string]: any } = {}) => {
    setMethod('fetchPermissions');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const permissionList = await PermissionService.list(filters);
      setPermissions(permissionList);
      setSuccess(true);
    } catch (error) {
      console.error('Error fetching permissions:', error);
      setError('Error fetching permissions');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPermission = async (permissionId: number) => {
    setMethod('fetchPermission');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const permission = await PermissionService.retrieve(permissionId);
      setPermission(permission);
      setSuccess(true);
      return permission;
    } catch (error) {
      console.error(`Error fetching permission with id ${permissionId}:`, error);
      setError('Error fetching permission');
    } finally {
      setLoading(false);
    }
  };

  const createPermission = async (permission: Partial<Permission>) => {
    setMethod('createPermission');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const newPermission = await PermissionService.create(permission);
      setPermission(newPermission);
      setSuccess(true);
    } catch (error) {
      console.error('Error creating permission:', error);
      setError('Error creating permission');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const updatePermission = async (permissionId: number, permission: Partial<Permission>) => {
    setMethod('updatePermission');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const updatedPermission = await PermissionService.update(permissionId, permission);
      setPermission(updatedPermission);
      setSuccess(true);
    } catch (error) {
      console.error(`Error updating permission with id ${permissionId}:`, error);
      setError('Error updating permission');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const deletePermission = async (permissionId: number) => {
    setMethod('deletePermission');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await PermissionService.destroy(permissionId);
      setSuccess(true);
    } catch (error) {
      console.error(`Error deleting permission with id ${permissionId}:`, error);
      setError('Error deleting permission');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    permission,
    permissions,
    loading,
    error,
    success,
    method,
    fetchPermissions,
    fetchPermission,
    createPermission,
    updatePermission,
    deletePermission,
  };
};
