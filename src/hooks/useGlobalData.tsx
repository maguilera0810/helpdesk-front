


import { useEffect } from 'react';
import globalDataStore from '../stores/globalDataStore';
import useAuthStore from '../stores/useAuthStore';
import { useCategory } from './useCategory';
import { usePriority } from './usePriority';

const useGlobalData = () => {

  const { reload, setReload, priorities, setPriorities, categories, setCategories } = globalDataStore();
  const { priorities: fetchedPriorities, fetchPriorities } = usePriority();
  const { categories: fetchedCategories, fetchCategories } = useCategory();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!reload || !token) {
      return
    }
    console.log("fetchPriorities");
    fetchPriorities();
    fetchCategories();
    setReload(false);
  }, [reload, token])


  useEffect(() => {
    setPriorities(fetchedPriorities);
  }, [fetchedPriorities])

  useEffect(() => {
    setCategories(fetchedCategories);
  }, [fetchedCategories])



  return {
    reload,
    priorities,
    categories,
    setReload,
  };
};


export default useGlobalData;