import { SelectChangeEvent } from "@mui/material/Select"
import { ChangeEvent } from "react"

export type BaseMethod<T> = (data?: Partial<T> | number) => void
export type BaseChangeMethod<T> = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> | SelectChangeEvent<T[]>) => void


export type methodTask = "fetchTasks" | "fetchTask" | "createTask" | "updateTask" | "deleteTask" | "fetchUserTasks" | "fetchTrackingTasks";
export type methodIssue = 'fetchIssues' | 'fetchIssue' | 'createIssue' | 'createTask' | 'updateIssue' | 'deleteIssue';

export type methodUser = 'fetchUsers' | 'fetchUser' | 'createUser' | 'updateUser' | 'deleteUser';
export type methodRole = 'fetchRoles' | 'fetchRole' | 'createRole' | 'updateRole' | 'deleteRole';
export type methodPermission = 'fetchPermissions' | 'fetchPermission' | 'createPermission' | 'updatePermission' | 'deletePermission';

export type methodCategory = 'fetchCategories' | 'fetchCategory' | 'createCategory' | 'updateCategory' | 'deleteCategory';
export type methodCategoryType = 'fetchCategoryTypes' | 'fetchCategoryType' | 'createCategoryType' | 'updateCategoryType' | 'deleteCategoryType';
export type methodPriority = 'fetchPriorities' | 'fetchPriority' | 'createPriority' | 'updatePriority' | 'deletePriority';
