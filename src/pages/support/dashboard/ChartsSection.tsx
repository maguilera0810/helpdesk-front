import { FC } from 'react';

import IssueTaskLineChart from '../../../components/forms/data_visualization/IssueTaskLineChart';
import StatusTasksBarChart from '../../../components/forms/data_visualization/StatusTasksBarChart';
import Swipper from '../../../components/layouts/Swipper';

type typeChart = 'statusTasks' | 'IssueTask'

const RenderChart = (type: typeChart) => {
  if (type === 'statusTasks') {
    return <StatusTasksBarChart color='#00acc1' key={type} />;
  } else if (type === 'IssueTask') {
    return <IssueTaskLineChart key={type} />
  }
  return <></>
}

const ChartsSection: FC = () => {

  const charts: typeChart[] = ['statusTasks', 'IssueTask']
  return (
    <Swipper movementStep={1.5}>
      {charts.map((chart) => RenderChart(chart))}
    </Swipper>
  );
};

export default ChartsSection;
