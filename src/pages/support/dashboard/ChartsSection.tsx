import { FC } from 'react';

import IssueCategoriesPieChart from '../../../components/data_visualization/IssueCategoriesPieChart';
import TaskCategoriesPieChart from '../../../components/data_visualization/TaskCategoriesPieChart';
import Swipper from '../../../components/layouts/Swipper';

type typeChart = 'TaskCategories' | 'IssueCategories';

const RenderChart = (type: typeChart) => {
  if (type === 'TaskCategories') {
    return <TaskCategoriesPieChart key={type} />
  } else if (type === 'IssueCategories') {
    return <IssueCategoriesPieChart key={type} />
  }
  return <></>
}

const ChartsSection: FC = () => {

  const charts: typeChart[] = ['TaskCategories', 'IssueCategories']
  return (
    <Swipper movementStep={1.5}>
      {charts.map((chart) => RenderChart(chart))}
    </Swipper>
  );
};

export default ChartsSection;
