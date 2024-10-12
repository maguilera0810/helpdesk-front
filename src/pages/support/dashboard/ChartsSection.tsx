import { FC } from 'react';

import Box from '@mui/material/Box';
import IssueTaskLineChart from '../../../components/forms/data_visualization/IssueTaskLineChart';
import StatusTasksBarChart from '../../../components/forms/data_visualization/StatusTasksBarChart';

type typeChart = 'statusTasks' | 'IssueTask'

const RenderChart = (type: typeChart) => {
  const key = `${type}${Math.random()}`
  if (type === 'statusTasks') {
    return <StatusTasksBarChart color='#00acc1' key={key} />;
  } else if (type === 'IssueTask') {
    return <IssueTaskLineChart key={key} />
  }
  return <></>


}

const ChartsSection: FC = () => {

  const charts: typeChart[] = ['statusTasks', 'IssueTask']
  return (
    <Box
      sx={{
        display: 'flex',
        overflowX: 'auto',
        padding: 2,
        width: { xs: '95vw', sm: '100%' },
        gap: 2,
        scrollbarWidth: 'thin',
        scrollbarColor: '#888 #f1f1f1',
        scrollbarGutter: 'stable'
      }}
    >
      {charts.map((chart) => RenderChart(chart))}
    </Box>
  );
};

export default ChartsSection;
