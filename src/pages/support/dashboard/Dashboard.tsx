import { FC } from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import PersonIcon from '@mui/icons-material/Person';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Typography } from '@mui/material';

import Layout from '../../../components/layouts/Layout';
import ChartsSection from './ChartsSection';
import KPISection from './KPISection';



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
    key: 'Satisfacción del Cliente',
    title: 'Satisfacción del Cliente',
    value: '92%',
    icon: <ThumbUpIcon />,
    color: '#388e3c',
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
      <Typography variant="h1" gutterBottom>
        Tablero
      </Typography>
      <KPISection kpis={KPIS} />
      <ChartsSection />

    </Layout>
  );
};

export default Dashboard;
