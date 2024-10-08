import { ChangeEvent, FC, useEffect, useState } from "react";

import { Box, Button, SelectChangeEvent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";

import MultipleSelectField from "../../../components/forms/fields/MultipleSelectField.tsx";
import Layout from '../../../components/layouts/Layout.tsx';
import { useTask } from "../../../hooks/useTask.tsx";
import { useUser } from "../../../hooks/useUser.tsx";
import useTaskStore from "../../../stores/useTaskStore.ts";
import useUserStore from "../../../stores/useUserStore.ts";
import TrackingGrid from "./TrackingGrid.tsx";


const gridSizes = {
  xs: 12,
  sm: 6,
  md: 4,
  xl: 3,
};

interface TaskTrackingFilter {
  team?: number[];
  date?: Dayjs | null;
}
type handleInputChangeType = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | SelectChangeEvent<string> | SelectChangeEvent<any[]>;

const TaskTracking: FC = () => {

  const [filters, setFilters] = useState<TaskTrackingFilter>({ team: [], date: dayjs().tz("America/Guayaquil") });
  const { loading, schedule, fetchTrackingTasks } = useTask();
  const { users, fetchUsers } = useUser()
  const { setUsers } = useUserStore();
  const { schedule: scheduleStore, setSchedule, setCurrDate } = useTaskStore()

  const handleInputChange = (e: handleInputChangeType) => {
    const { name, value } = e.target;
    if (name) {
      setFilters((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    const cleanDate = newDate ?
      newDate.set('second', 0).set('millisecond', 0).tz("America/Guayaquil") :
      newDate;
    setCurrDate(cleanDate);
    setFilters((prev) => ({
      ...prev,
      ['date']: cleanDate
    }));
  }
  const handleSubmit = () => {
    if (!(filters.team?.length && filters.date)) {
      setSchedule(null);
      return;
    }
    fetchTrackingTasks({
      team: filters.team,
      currDate: filters.date?.toDate()
    });
  }

  useEffect(() => {
    setCurrDate(dayjs());
    fetchUsers();
  }, []);

  useEffect(() => {
    setUsers(users);
  }, [users]);

  useEffect(() => {
  }, [filters]);

  useEffect(() => {
    schedule && setSchedule(schedule)
  }, [schedule])

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Seguimiento de Tareas
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
        <Grid container spacing={1} alignItems={"start"} alignContent={"start"} justifyContent={"start"}  >
          <Grid size={{ ...gridSizes, sm: 3, md: 2, lg: 2, xl: 2 }} key={"date"}>
            <DatePicker
              label='Día'
              name='date'
              sx={{ width: '100%' }}
              displayWeekNumber={true}
              format={'DD/MM/YYYY'}
              slotProps={{ textField: { fullWidth: true } }}
              value={filters.date}
              onChange={handleDateChange}
            />
          </Grid>
          <Grid size={"grow"} key={'users'}>
            <MultipleSelectField
              value={filters.team ?? []}
              onChange={handleInputChange}
              label={'Personal'}
              name={'team'}
              options={users.map(user => ({ value: user.id, label: `${user.firstName} ${user.lastName}` }))} />
          </Grid>
          <Grid size={{ xs: 12, sm: "auto" }} key={'button'}>
            <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading} sx={{ height: '56px', width: '100%' }}>
              Buscar
            </Button>
          </Grid>
        </Grid>
        {scheduleStore && <Grid container spacing={1} alignItems={"center"} alignContent={"center"} justifyContent={"start"}  >
          <TrackingGrid />
        </Grid>}
      </Box>
    </Layout>
  );
}


export default TaskTracking