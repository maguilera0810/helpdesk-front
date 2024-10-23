import { IOption } from "../interfaces/GlobalInterfaces";

export const taskTypeOptions: IOption[] = [
  { value: 'preventive', label: 'Preventiva' },
  { value: 'emergency', label: 'Emergente' },
];


export const taskStatusOptions: IOption[] = [ // ESTO SI VA
  { value: 'por_hacer', label: 'Por hacer' },
  { value: 'en_ejecucion', label: 'En ejecución' },
  { value: 'bloqueado', label: 'Bloqueado' },
  { value: 'programado', label: 'Programado' },
  { value: 'reprogramado', label: 'Reprogramado' },
  { value: 'no_ejecutable', label: 'No ejecutado' },
  { value: 'completado', label: 'Completado' },
];

export const issueStatusOptions: IOption[] = [ // ESTO SI VA
  { value: 'recibido', label: 'Recibido' },
  { value: 'tarea_creada', label: 'Tarea Creada' },
  { value: 'rechazado', label: 'Rechazado' },
  { value: 'completedo', label: 'Completed' },
];

export const priorityOptions: IOption[] = [ // ESTO NO VA
  { value: 'lowest', label: 'Lowest' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'highest', label: 'Highest' },
];
