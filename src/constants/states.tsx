import {
  Assignment, AssignmentTurnedIn, Block,
  CheckCircle, Close, NotInterested,
  PlayArrow, Replay, Schedule, Task
} from '@mui/icons-material';

import { Status } from '../interfaces/GlobalInterfaces';


export const taskStatuses: Status[] = [
  {
    value: 'por_hacer',
    label: 'Por hacer',
    color: '#1E90FF', // Azul
    icon: <Assignment />,
  },
  {
    value: 'en_ejecucion',
    label: 'En ejecución',
    color: '#FFA500', // Naranja
    icon: <PlayArrow />,
  },
  {
    value: 'bloqueado',
    label: 'Bloqueado',
    color: '#FF4500', // Rojo
    icon: <Block />,
  },
  {
    value: 'programado',
    label: 'Programado',
    color: '#32CD32', // Verde suave
    icon: <Schedule />,
  },
  {
    value: 'reprogramado',
    label: 'Reprogramado',
    color: '#FFD700', // Amarillo
    icon: <Replay />,
  },
  {
    value: 'no_ejecutable',
    label: 'No ejecutale',
    color: '#A9A9A9', // Gris
    icon: <NotInterested />,
  },
  {
    value: 'completado',
    label: 'Completado',
    color: '#28A745', // Verde fuerte
    icon: <CheckCircle />,
  },
];

export const issueStatuses: Status[] = [
  {
    value: 'recibido',
    label: 'Recibido',
    color: '#90EE90',  // Verde suave
    icon: <Task />,
  },
  {
    value: 'tarea_creada',
    label: 'Tarea Creada',
    color: '#1E90FF',   // Azul
    icon: <AssignmentTurnedIn />,
  },
  {
    value: 'rechazado',
    label: 'Rechazado',
    color: '#FF6347',   // Rojo
    icon: <Close />,
  },
  {
    value: 'completado',
    label: 'Completado',
    color: '#32CD32',   // Verde fuerte
    icon: <CheckCircle />,
  },
];

