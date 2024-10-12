// src/components/BarChartComponent.tsx

import { FC } from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
// Definición de la interfaz para los datos del gráfico


const statusTasks = [
  {
    tareas: 40,
    status: 'En progreso',
    color: '#2196f3',
  },
  {
    tareas: 50,
    status: 'Completado',
    color: '#4caf50',
  },
  {
    tareas: 78,
    status: 'Cancelada',
    color: '#f44336'
  },
]




interface StatusTasksBarChartProps {
  title?: string;
  color?: string;
}

const chartSetting = {
  yAxis: [
    {
      dataKey: 'tareas',
      label: '#Tareas',
    },
  ],
  height: 300,
  // sx: {
  //   [`.${axisClasses.left} .${axisClasses.label}`]: {
  //     transform: 'translate(-20px, 0)',
  //   },
  // },
};

const StatusTasksBarChart: FC<StatusTasksBarChartProps> = ({ title = "Estado de Tareas", color = '#888888' }) => {

  return (
    <Paper elevation={3} sx={{ padding: 2, height: '100%', width: '100%', minWidth: {xs: '400px', sm: '500px'} }}>
      <Typography variant="h6" component="div" sx={{ mb: 2, textAlign: 'center' }}>
        {title}
      </Typography>
      <BarChart
        dataset={statusTasks}
        series={[
          {
            dataKey: 'tareas',
            type: 'bar',
            color,

          },
        ]}
        colors={['red', 'blue', 'green']}
        xAxis={[
          {
            scaleType: 'band',
            dataKey: 'status',
          },
        ]}

        {...chartSetting}

      />
    </Paper>
  );
};

export default StatusTasksBarChart;
