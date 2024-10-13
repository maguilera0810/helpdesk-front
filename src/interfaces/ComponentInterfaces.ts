import { Dayjs } from "dayjs";
import { BasaeMethodType } from "../types/methodTypes";
import { CategoryType, ScheduleTask } from "./ModelInterfaces";



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

export interface BaseMethodsProps<T> {
  onSubmit?: BasaeMethodType<T>
  onSuccess?: BasaeMethodType<T>
  onFail?: BasaeMethodType<T>
  onCancel?: BasaeMethodType<T>
}
