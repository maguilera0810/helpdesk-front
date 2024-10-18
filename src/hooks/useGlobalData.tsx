import { useEffect } from 'react';
import { Permission } from '../interfaces/ModelInterfaces';
import authStore from '../stores/auth/authStore';
import globalDataStore from '../stores/globalDataStore';
import { GroupedPermission } from '../types/groupTypes';
import { usePermission } from './admin/usePermission';
import { useCategory } from './settings/useCategory';
import { usePriority } from './settings/usePriority';
import { useUser } from './admin/useUser';

const useGlobalData = () => {

  const { reload, reloadPriority, reloadCategory, reloadPermission, setReload,
    lightUsers, setLightUsers,
    priorities, setPriorities,
    categories, setCategories,
    groupedPermissions, setGroupedPermissions, getFlatPermissions, getGroupedPermission,
  } = globalDataStore();
  const { lightUsers: fetchedLightUsers, fetchUsers } = useUser();
  const { priorities: fetchedPriorities, fetchPriorities } = usePriority();
  const { categories: fetchedCategories, fetchCategories } = useCategory();
  const { permissions: fetchedPermissions, fetchPermissions } = usePermission();
  const token = authStore((state) => state.token);

  useEffect(() => {
    if (!reload || !token) { return; }
    fetchUsers({}, true);
    fetchPriorities();
    fetchCategories();
    fetchPermissions();
    setReload(false);
  }, [reload, token])

  useEffect(() => {
    if (!reloadPriority || !token) { return; }
    fetchPriorities();
    setReload(false, 'priority');
  }, [reloadPriority, token])

  useEffect(() => {
    if (!reloadCategory || !token) { return; }
    fetchCategories();
    setReload(false, 'category');
  }, [reloadCategory, token])

  useEffect(() => {
    if (!reloadPermission || !token) { return; }
    fetchPermissions();
    setReload(false, 'permission');
  }, [reloadPermission, token])

  useEffect(() => {
    console.log("fetchedLightUsers");
    console.log(fetchedLightUsers);
    
    fetchedLightUsers.length && setLightUsers(fetchedLightUsers);
  }, [fetchedLightUsers])

  useEffect(() => {
    fetchedPriorities.length && setPriorities(fetchedPriorities);
  }, [fetchedPriorities])

  useEffect(() => {
    fetchedPriorities.length && setCategories(fetchedCategories);
  }, [fetchedCategories])

  useEffect(() => {
    if (!fetchedPermissions.length) {
      return;
    }
    const groupedPermissions = fetchedPermissions.reduce((acc: GroupedPermission, permission: Permission) => {
      if (!acc[permission.group]) {
        acc[permission.group] = [];
      }
      acc[permission.group].push(permission);
      return acc;
    }, {} as GroupedPermission);
    setGroupedPermissions(groupedPermissions);
  }, [fetchedPermissions])


  return {
    reload,
    lightUsers,
    priorities,
    categories,
    groupedPermissions,
    setReload,
    getFlatPermissions,
    getGroupedPermission,
  };
};


export default useGlobalData;