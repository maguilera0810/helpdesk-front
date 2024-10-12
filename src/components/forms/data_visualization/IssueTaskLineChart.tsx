// src/components/BarChartComponent.tsx

import { FC } from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// Definición de la interfaz para los datos del gráfico
import { LineChart } from '@mui/x-charts/LineChart';

const dataset = [
  {
    tasks: 40,
    issues: 50,
    month: 'en',
  },
  {
    tasks: 40,
    issues: 50,
    month: 'feb',
  },
  {
    tasks: 40,
    issues: 50,
    month: 'mar',
  },
  {
    tasks: 40,
    issues: 50,
    month: 'abr',
  },
  {
    tasks: 40,
    issues: 60,
    month: 'may',
  },
  {
    tasks: 30,
    issues: 60,
    month: 'jun',
  },
  {
    tasks: 45,
    issues: 75,
    month: 'jul',
  },
  {
    tasks: 10,
    issues: 65,
    month: 'ag',
  },
  {
    tasks: 40,
    issues: 67,
    month: 'sept',
  },
  {
    tasks: 34,
    issues: 89,
    month: 'oct',
  },
]




interface IssueTaskLineChartProps {
  title?: string;
}

const IssueTaskLineChart: FC<IssueTaskLineChartProps> = ({ title = "Tareas/Problemas Creados" }) => {

  return (
    <Paper elevation={3} sx={{ padding: 2, height: '100%', width: '100%', minWidth: { xs: '400px', sm: '500px' } }}>
      <Typography variant="h6" component="div" sx={{ mb: 2, textAlign: 'center' }}>
        {title}
      </Typography>
      <LineChart
        dataset={dataset}
        xAxis={[{ scaleType: 'band', dataKey: 'month', label: 'Mes' }]}
        yAxis={[{ label: '#Tareas' }]}
        height={300}
        series={[
          {
            dataKey: 'tasks',
            label: 'Tareas',
            type: 'line',
          },
          {
            dataKey: 'issues',
            label: 'Problemas',
            type: 'line',
          },
        ]}
        sx={{
          // [`.${axisClasses.left} .${axisClasses.label}`]: {
          //   transform: 'translate(-20px, 0)',
          // },
        }}
      />
    </Paper>
  );
};

export default IssueTaskLineChart;
