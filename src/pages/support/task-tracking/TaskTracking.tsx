import { ChangeEvent, FC, useEffect, useState } from "react";

import { Box, SelectChangeEvent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";

import MultipleSelectField from "../../../components/forms/fields/MultipleSelectField.tsx";
import Layout from '../../../components/layouts/Layout.tsx';
import { useUser } from "../../../hooks/useUser.tsx";
import useTaskStore from "../../../stores/useTaskStore.ts";


const gridSizes = {
  xs: 12,
  sm: 6,
  md: 4,
  xl: 3,
};

interface TaskTrackingFilter {
  users: number[];
  date: Dayjs | null;
}

const TaskTracking: FC = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState<Partial<TaskTrackingFilter>>({ users: [], date: dayjs() });
  // const {users} = useUserStore();
  const { users, fetchUsers } = useUser()
  const { currDate, setSchedule, setCurrDate } = useTaskStore()


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> | SelectChangeEvent<any[]>) => {
    const { name, value } = e.target;
    if (name) {
      setFilters((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    const cleanDate = newDate ? newDate.set('second', 0).set('millisecond', 0) : newDate;
    setCurrDate(cleanDate);
    setFilters((prev) => ({
      ...prev,
      ['date']: cleanDate
    }));
  }
  const handleSubmit = () => {

  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    console.log(filters);
  }, [filters]);


  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Seguimiento de Tareas
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
        <Grid container spacing={1} alignItems={"start"} alignContent={"start"} justifyContent={"start"}  >
          <Grid size={{ ...gridSizes, sm: 2, md: 2, lg: 2, xl: 2 }} key={"date"}>
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
              value={filters.users ?? []}
              onChange={handleInputChange}
              label={'Personal'}
              name={'users'}
              options={users.map(user => ({ value: user.id, label: `${user.firstName} ${user.lastName}` }))} />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}


export default TaskTracking