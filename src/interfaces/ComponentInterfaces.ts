import { Dayjs } from "dayjs";
import { CategoryType, ScheduleTask } from "./ModelInterfaces";



export interface ScheduleColumnProps {
  tasks: ScheduleTask[];
  times: Dayjs[];
}

export interface GridTaskProps {
  type: 'disponible' | 'ocupado' | 'propuesta' | 'actual' | 'colision';
  time: Dayjs;
  task?: ScheduleTask;
  onClick?: ((id: number) => void) | (() => void);
}


export interface CategoryTypeFormProps {
  categoryTypeInput?: CategoryType;
  onSave?: () => void;
  onCancel?: () => void;
  isDialog?: boolean;
}
