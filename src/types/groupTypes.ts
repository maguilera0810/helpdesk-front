import { Permission } from "../interfaces/ModelInterfaces";


export type GroupedPermissionType =
  'support_dashboard' |
  'support_tracking' |
  'support_task' |
  'support_issue' |
  'admin_user' |
  'admin_role' |
  'settings_profile' |
  'settings_category' |
  'settings_priority';
export type GroupedPermission = Record<GroupedPermissionType, Permission[]>;

