import { Dayjs } from "dayjs";
import { CategoryType, Permission, ScheduleTask } from "./ModelInterfaces";

export interface ScheduleColumnProps {
  tasks: ScheduleTask[];
  times: Dayjs[];
}

export interface ScheduleItemProps {
  type: 'disponible' | 'ocupado' | 'propuesta' | 'actual' | 'colision';
  time: Dayjs;
  task?: ScheduleTask;
  onClick?: ((id: number) => void) | (() => void);
}

export interface TrackingItemProps extends ScheduleItemProps {
  type: 'disponible' | 'ocupado';
}


export interface CategoryTypeFormProps {
  categoryTypeInput?: CategoryType;
  onSave?: () => void;
  onCancel?: () => void;
  isDialog?: boolean;
}

export interface GroupPermission { // Add here if a new permission group is created
  dashboard: Permission[];
  tracking: Permission[];
  task: Permission[];
  issue: Permission[];
  user: Permission[];
  role: Permission[];
  profile: Permission[];
  category: Permission[];
  priority: Permission[];
}
