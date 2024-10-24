import { useEffect } from 'react';
import { Permission } from '../interfaces/ModelInterfaces';
import authStore from '../stores/auth/authStore';
import globalDataStore from '../stores/globalDataStore';
import { GroupedPermission } from '../types/groupTypes';
import { ReloadType } from '../types/methodTypes';
import { usePermission } from './admin/usePermission';
import { useUser } from './admin/useUser';
import { useCategory } from './settings/useCategory';
import { useIssueStatus } from './settings/useIssueStatus';
import { usePriority } from './settings/usePriority';
import { useTaskStatus } from './settings/useTaskStatus';

const useGlobalData = () => {

  const { reload, reloadUser, reloadPriority, reloadIssueStatus,
    reloadCategory, reloadPermission, reloadTaskStatus, setReload,
    groupedPermissions, setGroupedPermissions, getFlatPermissions, getGroupedPermission,
    lightUsers, setLightUsers,
    priorities, setPriorities,
    categories, setCategories,
    taskStatuses, setTaskStatuses,
    issueStatuses, setIssueStatuses,
  } = globalDataStore();
  const { taskStatuses: fetchedTaskStatuses, fetchTaskStatuses } = useTaskStatus();
  const { issueStatuses: fetchedIssueStatuses, fetchIssueStatuses } = useIssueStatus();
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
    fetchPermissions();
    fetchUsers({}, true);
    fetchPriorities();
    fetchCategories();
    fetchTaskStatuses();
    fetchIssueStatuses();
  });
  useReloadData(reloadPermission, fetchPermissions, 'permission');
  useReloadData(reloadUser, () => fetchUsers({}, true), 'user');
  useReloadData(reloadPriority, fetchPriorities, 'priority');
  useReloadData(reloadCategory, fetchCategories, 'category');
  useReloadData(reloadTaskStatus, fetchTaskStatuses, 'taskStatus');
  useReloadData(reloadIssueStatus, fetchIssueStatuses, 'issueStatus');

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

  useEffect(() => {
    fetchedLightUsers.length && setLightUsers(fetchedLightUsers);
  }, [fetchedLightUsers])

  useEffect(() => {
    fetchedPriorities.length && setPriorities(fetchedPriorities);
  }, [fetchedPriorities])

  useEffect(() => {
    fetchedCategories.length && setCategories(fetchedCategories);
  }, [fetchedCategories])

  useEffect(() => {
    fetchedTaskStatuses.length && setTaskStatuses(fetchedTaskStatuses);
  }, [fetchedTaskStatuses])

  useEffect(() => {
    fetchedIssueStatuses.length && setIssueStatuses(fetchedIssueStatuses);
  }, [fetchedIssueStatuses])

  return {
    reload,
    groupedPermissions,
    lightUsers,
    priorities,
    categories,
    taskStatuses,
    issueStatuses,
    setReload,
    getFlatPermissions,
    getGroupedPermission,
  };
};


export default useGlobalData;