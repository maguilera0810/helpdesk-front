import { IOption } from "../interfaces/GlobalInterfaces";

export const taskTypeOptions: IOption[] = [
  { value: 'preventive', label: 'Preventiva' },
  { value: 'emergency', label: 'Emergente' },
];


export const taskStatusOptions: IOption[] = [
  { value: 'to_do', label: 'Por hacer' },
  { value: 'in_progress', label: 'En ejecución' },
  { value: 'blocked', label: 'Bloqueado' },
  { value: 'scheduled', label: 'Programado' },
  { value: 'rescheduled', label: 'Reprogramado' },
  { value: 'executed', label: 'Ejecutado' },
  { value: 'to_validate', label: 'Por validar' },
  { value: 'completed', label: 'Completado' },
];

export const issueStatusOptions: IOption[] = [
  { value: 'received', label: 'Recibido' },
  { value: 'task_created', label: 'Tarea Creada' },
  { value: 'rejected', label: 'Rechazado' },
  { value: 'to_validate', label: 'Por Validar' },
  { value: 'completed', label: 'Completed' },
];

export const priorityOptions: IOption[] = [
  { value: 'lowest', label: 'Lowest' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'highest', label: 'Highest' },
];
