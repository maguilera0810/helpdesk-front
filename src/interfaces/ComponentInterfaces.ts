import { Dayjs } from "dayjs";
import { Option } from "./GlobalInterfaces";
import { CategoryType, ScheduleTask } from "./ModelInterfaces";


export interface RandomStringProps {
  length?: number;
  useLowercase?: boolean;
  useUppercase?: boolean;
  useNumbers?: boolean;
  useSpecialChars?: boolean;
}

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


export interface CheckboxGroupProps<T> {
  label?: string;
  isGroup?: boolean;
  options: Option[];
  value: T[];
  onChange?: (selected: T[]) => void;
}
