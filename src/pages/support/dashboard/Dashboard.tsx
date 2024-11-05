import { FC, useEffect } from 'react';

import { Typography } from '@mui/material';
import { SelectField } from '../../../components/forms/fields';
import Layout from '../../../components/layouts/Layout';
import { periodOptions } from '../../../constants/options';
import { useDataAnalytics } from '../../../hooks/analytics/useDataAnalytics';
import filterStore from '../../../stores/filterStore';
import { BaseChangeMethod } from '../../../types/methodTypes';
import ChartsSection from './ChartsSection';
import IssueStatusSection from './IssueStatusSection';
import TaskStatusSection from './TaskStatusSection';


const Dashboard: FC = () => {
  const { fetchData } = useDataAnalytics();
  const { filters, setFilters, clearFilters } = filterStore();

  const handleInputChange: BaseChangeMethod<any> = (e) => {
    const { name, value } = e.target;
    if (name) {
      setFilters({ ...filters, [name]: value });
    }
  };

  useEffect(() => {
    setFilters({ "period": "today" })
    return () => clearFilters();
  }, [])

  useEffect(() => {
    filters && fetchData(filters);
  }, [filters])


  return (
    <Layout>
      <Typography variant="h1" gutterBottom>
        Tablero
      </Typography>
      <SelectField
        label="Periodo"
        name="period"
        value={filters.period ?? ''}
        options={periodOptions}
        onChange={(e) => handleInputChange(e)}
        fullWidth
        height="56px"
      />
      <TaskStatusSection />
      <IssueStatusSection />
      <ChartsSection />

    </Layout>
  );
};

export default Dashboard;
