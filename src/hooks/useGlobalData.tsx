import { useEffect } from 'react';
import globalDataStore from '../stores/globalDataStore';
import authStore from '../stores/authStore';
import { useCategory } from './settings/useCategory';
import { usePriority } from './settings/usePriority';

const useGlobalData = () => {

  const { reload, setReload, priorities, setPriorities, categories, setCategories } = globalDataStore();
  const { priorities: fetchedPriorities, fetchPriorities } = usePriority();
  const { categories: fetchedCategories, fetchCategories } = useCategory();
  const token = authStore((state) => state.token);

  useEffect(() => {
    if (!reload || !token) {
      return;
    }
    fetchPriorities();
    fetchCategories();
    setReload(false);
  }, [reload, token])

  useEffect(() => {
    fetchedPriorities.length && setPriorities(fetchedPriorities);
  }, [fetchedPriorities])

  useEffect(() => {
    fetchedPriorities.length && setCategories(fetchedCategories);
  }, [fetchedCategories])


  return {
    reload,
    priorities,
    categories,
    setReload,
  };
};


export default useGlobalData;