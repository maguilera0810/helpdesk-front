import { useCallback, useState } from 'react';
import { Category } from '../../interfaces/ModelInterfaces';
import CategoryService from '../../services/settings/CategoryService';

export const useCategory = () => {
  const [category, setCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [method, setMethod] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const fetchCategories = useCallback(async (filters: { [key: string]: any } = {}) => {
    setMethod('fetchCategories');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const categoryList = await CategoryService.list(filters);
      setCategories(categoryList);
      setSuccess(true);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Error fetching categories');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategory = async (categoryId: number) => {
    setMethod('fetchCategory');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const category = await CategoryService.retrieve(categoryId);
      setCategory(category);
      setSuccess(true);
      return category;
    } catch (error) {
      console.error(`Error fetching category with id ${categoryId}:`, error);
      setError('Error fetching category');
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (category: Partial<Category>) => {
    setMethod('createCategory');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const newCategory = await CategoryService.create(category);
      setCategory(newCategory);
      setSuccess(true);
    } catch (error) {
      console.error('Error creating category:', error);
      setError('Error creating category');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (categoryId: number, category: Partial<Category>) => {
    setMethod('updateCategory');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const updatedCategory = await CategoryService.update(categoryId, category);
      setCategory(updatedCategory);
      setSuccess(true);
    } catch (error) {
      console.error(`Error updating category with id ${categoryId}:`, error);
      setError('Error updating category');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (categoryId: number) => {
    setMethod('deleteCategory');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await CategoryService.destroy(categoryId);
      setSuccess(true);
    } catch (error) {
      console.error(`Error deleting category with id ${categoryId}:`, error);
      setError('Error deleting category');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    category,
    categories,
    loading,
    error,
    success,
    method,
    fetchCategories,
    fetchCategory,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
