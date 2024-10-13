import { useEffect } from 'react';
import authStore from '../stores/auth/authStore';
import globalDataStore from '../stores/globalDataStore';
import { usePermission } from './admin/usePermission';
import { useCategory } from './settings/useCategory';
import { usePriority } from './settings/usePriority';

const useGlobalData = () => {

  const { reload, reloadPriority, reloadCategory, reloadPermission, setReload,
    priorities, setPriorities,
    categories, setCategories,
    permissions, setPermissions } = globalDataStore();
  const { priorities: fetchedPriorities, fetchPriorities } = usePriority();
  const { categories: fetchedCategories, fetchCategories } = useCategory();
  const { permissions: fetchedPermissions, fetchPermissions } = usePermission();
  const token = authStore((state) => state.token);

  useEffect(() => {
    if (!reload || !token) { return; }
    fetchPriorities();
    fetchCategories();
    fetchPermissions();
    setReload(false);
  }, [reload, token])

  useEffect(() => {
    if (!reloadPermission || !token) { return; }
    fetchPriorities();
    setReload(false, 'priority');
  }, [reloadPriority, token])

  useEffect(() => {
    if (!reloadPermission || !token) { return; }
    fetchCategories();
    setReload(false, 'category');
  }, [reloadCategory, token])

  useEffect(() => {
    if (!reloadPermission || !token) { return; }
    fetchPermissions();
    setReload(false, 'permission');
  }, [reloadPermission, token])

  useEffect(() => {
    fetchedPriorities.length && setPriorities(fetchedPriorities);
  }, [fetchedPriorities])

  useEffect(() => {
    fetchedPriorities.length && setCategories(fetchedCategories);
  }, [fetchedCategories])

  useEffect(() => {
    fetchedPermissions.length && setPermissions(fetchedPermissions);
  }, [fetchedPermissions])


  return {
    reload,
    priorities,
    categories,
    permissions,
    setReload,
  };
};


export default useGlobalData;