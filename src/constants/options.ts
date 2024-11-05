import { Option } from "../interfaces/GlobalInterfaces";

export const taskTypeOptions: Option[] = [
  { value: 'preventiva', label: 'Preventiva' },
  { value: 'emergente', label: 'Emergente' },
];


export const taskStatusOptions: Option[] = [
  { value: 'por_hacer', label: 'Por hacer' },
  { value: 'en_ejecucion', label: 'En ejecución' },
  { value: 'bloqueado', label: 'Bloqueado' },
  { value: 'programado', label: 'Programado' },
  { value: 'reprogramado', label: 'Reprogramado' },
  { value: 'no_ejecutable', label: 'No ejecutado' },
  { value: 'completado', label: 'Completado' },
];

export const issueStatusOptions: Option[] = [
  { value: 'recibido', label: 'Recibido' },
  { value: 'tarea_creada', label: 'Tarea Creada' },
  { value: 'rechazado', label: 'Rechazado' },
  { value: 'completedo', label: 'Completed' },
];

export const priorityOptions: Option[] = [
  { value: 'lowest', label: 'Lowest' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'highest', label: 'Highest' },
];

export const periodOptions: Option[] = [
  { value: 'today', label: 'Hoy' },
  { value: 'yesterday', label: 'Ayer' },
  { value: 'last_7_days', label: 'Hace 7 días' },
  { value: 'last_14_days', label: 'Hace 14 días' },
  { value: 'last_month', label: 'Este mes' },
  { value: 'last_3_months', label: 'Últimos 3 meses' },
  { value: 'current_year', label: 'Este año' },
  { value: 'last_5_years', label: 'Últimos 5 meses' },
];
