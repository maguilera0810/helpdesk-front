import { Dayjs } from "dayjs";
import { ReactNode } from "react";

import { Option } from "./GlobalInterfaces";
import { CategoryType, IssueComment, ScheduleTask, TaskComment } from "./ModelInterfaces";

export interface ParentComponentProps {
  children: ReactNode;
}
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


export interface LayoutDialogProps extends ParentComponentProps {
  open: boolean;
  title: string;
  okText?: string;
  cancelText?: string;
  message?: string;
  onOk: () => void;
  onCancel: () => void;
}

export interface CommentProps {
  comment: IssueComment | TaskComment;
}

export interface ComentListProps {
  type: 'issue' | 'task';
  onSave: () => void;
}

export interface CommentFormDialogProps {
  open: boolean;
  type?: 'task' | 'issue';
  taskComment?: TaskComment;
  issueComment?: IssueComment;
  onConfirm?: (value?: number | TaskComment | IssueComment) => void;
  onClose?: () => void;
}
