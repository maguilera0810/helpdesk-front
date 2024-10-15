import { useCallback, useState } from 'react';
import { CategoryType } from '../../interfaces/ModelInterfaces';
import CategoryTypeService from '../../services/settings/CategoryTypeService';

export const useCategoryType = () => {
  const [categoryType, setCategoryType] = useState<CategoryType | null>(null);
  const [categoryTypes, setCategoryTypes] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [method, setMethod] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const fetchCategoryTypes = useCallback(async (filters: { [key: string]: any } = {}) => {
    setMethod('fetchCategoryTypes');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const categoryTypeList = await CategoryTypeService.list(filters);
      setCategoryTypes(categoryTypeList);
      setSuccess(true);
    } catch (error) {
      console.error('Error fetching category types:', error);
      setError('Error fetching category types');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategoryType = async (categoryTypeId: number) => {
    setMethod('fetchCategoryType');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const categoryType = await CategoryTypeService.retrieve(categoryTypeId);
      setCategoryType(categoryType);
      setSuccess(true);
      return categoryType;
    } catch (error) {
      console.error(`Error fetching categoryType with id ${categoryTypeId}:`, error);
      setError('Error fetching categoryType');
    } finally {
      setLoading(false);
    }
  };

  const createCategoryType = async (categoryType: Partial<CategoryType>) => {
    setMethod('createCategoryType');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const newCategoryType = await CategoryTypeService.create(categoryType);
      setCategoryType(newCategoryType);
      setSuccess(true);
    } catch (error) {
      console.error('Error creating categoryType:', error);
      setError('Error creating categoryType');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const updateCategoryType = async (categoryTypeId: number, categoryType: Partial<CategoryType>) => {
    setMethod('updateCategoryType');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const updatedCategoryType = await CategoryTypeService.update(categoryTypeId, categoryType);
      setCategoryType(updatedCategoryType);
      setSuccess(true);
    } catch (error) {
      console.error(`Error updating categoryType with id ${categoryTypeId}:`, error);
      setError('Error updating categoryType');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategoryType = async (categoryTypeId: number) => {
    setMethod('deleteCategoryType');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await CategoryTypeService.destroy(categoryTypeId);
      setSuccess(true);
    } catch (error) {
      console.error(`Error deleting categoryType with id ${categoryTypeId}:`, error);
      setError('Error deleting categoryType');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    categoryType,
    categoryTypes,
    loading,
    error,
    success,
    method,
    fetchCategoryType,
    fetchCategoryTypes,
    createCategoryType,
    updateCategoryType,
    deleteCategoryType,
  };
};
