import { FC } from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BarChartIcon from '@mui/icons-material/BarChart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import PersonIcon from '@mui/icons-material/Person';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import WorkIcon from '@mui/icons-material/Work';
import { Typography } from '@mui/material';
import Layout from '../../../components/layouts/Layout';




import KPISection from './KPISection';
import StatusTasksBarChart from '../../../components/forms/data_visualization/StatusTasksBarChart';
import ChartsSection from './ChartsSection';



const KPIS = [
  {
    key: 'Tareas Totales',
    title: 'Tareas Totales',
    value: 150,
    icon: <InsertChartIcon />,
    color: '#1e88e5',
    // unit: 'tareas',
  },
  {
    key: 'Tareas Completadas',
    title: 'Tareas Completadas',
    value: 120,
    icon: <CheckCircleIcon />,
    color: '#43a047',
    // unit: 'tareas',
  },
  {
    key: 'Tareas Pendientes',
    title: 'Tareas Pendientes',
    value: 30,
    icon: <AccessTimeIcon />,
    color: '#fb8c00',
    // unit: 'tareas',
  },
  {
    key: 'Proyectos Activos',
    title: 'Proyectos Activos',
    value: 8,
    icon: <WorkIcon />,
    color: '#5e35b1',
  },
  {
    key: 'Incidencias Resueltas',
    title: 'Incidencias Resueltas',
    value: 200,
    icon: <ErrorIcon />,
    color: '#00acc1',
    unit: 'incidencias',
  },
  {
    key: 'Porcentaje de Eficiencia',
    title: 'Porcentaje de Eficiencia',
    value: '85%',
    icon: <BarChartIcon />,
    color: '#f57c00',
  },
  {
    key: 'Horas de Trabajo',
    title: 'Horas de Trabajo',
    value: 320,
    icon: <AccessTimeIcon />,
    color: '#1976d2',
    unit: 'horas',
  },
  {
    key: 'Usuarios Activos',
    title: 'Usuarios Activos',
    value: 15,
    icon: <PersonIcon />,
    color: '#8e24aa',
    unit: 'usuarios',
  },
  {
    key: 'Satisfacción del Cliente',
    title: 'Satisfacción del Cliente',
    value: '92%',
    icon: <ThumbUpIcon />,
    color: '#388e3c',
  },
  {
    key: 'Tasa de Rechazo',
    title: 'Tasa de Rechazo',
    value: '5%',
    icon: <ThumbDownIcon />,
    color: '#e53935',
  },
];






const Dashboard: FC = () => {
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Tablero
      </Typography>
      <KPISection kpis={KPIS}/>
      <ChartsSection />
      
    </Layout>
  );
};

export default Dashboard;
