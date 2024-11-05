import { FC } from 'react';

import IssueTaskLineChart from '../../../components/data_visualization/IssueTaskLineChart';
import StatusTasksBarChart from '../../../components/data_visualization/StatusTasksBarChart';
import TaskCategoriesPieChart from '../../../components/data_visualization/TaskCategoriesPieChart';
import Swipper from '../../../components/layouts/Swipper';

type typeChart = 'statusTasks' | 'IssueTask' | 'TaskCategories' | 'IssueCategories';

const RenderChart = (type: typeChart) => {
  if (type === 'statusTasks') {
    return <StatusTasksBarChart color='#00acc1' key={type} />;
  } else if (type === 'IssueTask') {
    return <IssueTaskLineChart key={type} />
  } else if (type === 'TaskCategories') {
    return <TaskCategoriesPieChart key={type} />
  } else if (type === 'IssueCategories') {
    return <TaskCategoriesPieChart key={type} />
  }
  return <></>
}

const ChartsSection: FC = () => {

  const charts: typeChart[] = ['TaskCategories', 'IssueCategories', 'statusTasks', 'IssueTask']
  return (
    <Swipper movementStep={1.5}>
      {charts.map((chart) => RenderChart(chart))}
    </Swipper>
  );
};

export default ChartsSection;
