import { FC, useEffect } from 'react';

import { Typography } from '@mui/material';
import Layout from '../../../components/layouts/Layout';
import { useDataAnalytics } from '../../../hooks/analytics/useDataAnalytics';
import ChartsSection from './ChartsSection';
import IssueStatusSection from './IssueStatusSection';
import TaskStatusSection from './TaskStatusSection';


const Dashboard: FC = () => {
  const { fetchData } = useDataAnalytics();

  useEffect(() => {
    fetchData({ "period": "current_year" });
  }, [])

  return (
    <Layout>
      <Typography variant="h1" gutterBottom>
        Tablero
      </Typography>
      <TaskStatusSection />
      <IssueStatusSection />
      <ChartsSection />

    </Layout>
  );
};

export default Dashboard;
