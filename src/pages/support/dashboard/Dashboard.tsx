import { FC, useEffect } from 'react';

import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
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
      <Grid container spacing={2} >
        <Typography variant="h1">
          Tablero
        </Typography>
        <Grid size={{ xs: 12, sm: 4, md: 3, lg: 2 }}>
          <SelectField
            label=""
            name="period"
            value={filters.period ?? ''}
            options={periodOptions}
            onChange={(e) => handleInputChange(e)}
            fullWidth
            height="40px"
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TaskStatusSection />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <IssueStatusSection />
        </Grid>
      </Grid>
      <ChartsSection />

    </Layout>
  );
};

export default Dashboard;
