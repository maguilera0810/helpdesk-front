import { useEffect } from 'react';
import { Permission } from '../interfaces/ModelInterfaces';
import authStore from '../stores/auth/authStore';
import globalDataStore from '../stores/globalDataStore';
import { GroupedPermission } from '../types/groupTypes';
import { ReloadType } from '../types/methodTypes';
import { usePermission } from './admin/usePermission';
import { useUser } from './admin/useUser';
import { useCategory } from './settings/useCategory';
import { usePriority } from './settings/usePriority';

const useGlobalData = () => {

  const { reload, reloadUser, reloadPriority, reloadCategory, reloadPermission, setReload,
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

  const useReloadData = (reloadFlag: boolean, callback: () => void, reloadType?: ReloadType) => {
    useEffect(() => {
      if (!reloadFlag || !token) return;
      callback();
      setReload(false, reloadType);
    }, [reloadFlag, token, callback, reloadType]);
  };

  useReloadData(reload, () => {
    fetchUsers({}, true);
    fetchPriorities();
    fetchCategories();
    fetchPermissions();
  });
  useReloadData(reloadUser, () => fetchUsers({}, true), 'user');
  useReloadData(reloadPriority, fetchPriorities, 'priority');
  useReloadData(reloadCategory, fetchCategories, 'category');
  useReloadData(reloadPermission, fetchPermissions, 'permission');


  useEffect(() => {
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