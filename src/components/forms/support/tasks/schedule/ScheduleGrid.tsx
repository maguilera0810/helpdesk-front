import { FC, useEffect, useState } from 'react';


import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import useTaskStore from '../../../../../stores/useTaskStore';
import useUserStore from '../../../../../stores/useUserStore';
import ScheduleColumn from './ScheduleColum';

dayjs.extend(utc);
dayjs.extend(timezone);

interface ScheduleGridProps {

}

const ScheduleGrid: FC<ScheduleGridProps> = () => {
  const { task, userTasks, currDate } = useTaskStore()
  const [times, setTimes] = useState<Dayjs[]>([])
  const users = useUserStore((state) => state.users);

  useEffect(() => {
    if (currDate) {
      const localTime = dayjs(currDate).tz("America/Guayaquil");
      setTimes(Array.from({ length: 24 * 2 }, (_, i) => localTime.startOf('day').add(i * 30, 'minutes')));
    } else {
      setTimes([]);
    }
  }, [currDate])

  useEffect(() => {
    console.log('ScheduleGrid.userTasks', userTasks);
  }, [userTasks])
  useEffect(() => {
    console.log('ScheduleGrid.task', task);
  }, [task])
  useEffect(() => {
    console.log('ScheduleGrid.users', users);
  }, [users])
  return (
    <Grid container
      size={"grow"}
      direction={"column"}
      justifyContent="space-between"
      alignItems="center"
      flexDirection={'column'}
      sx={{
        width: '100%',
        height: '500px', // Altura fija del contenedor
        overflowX: 'auto', // Scroll vertical si el contenido excede el tamaño
        border: '1px solid #ddd',
        padding: 2,
      }}
    >

      <Grid container direction={"row"} size={12}>
        <Grid key={"time"} size={1 / 2}>
        </Grid>
        {userTasks.map((userTask) => {
          const user = users.find(e => e.id == userTask.userId)
          return user && (
            <Grid key={user.id} size={"grow"}>
              <Typography variant="h6">{user.firstName}</Typography>
            </Grid>

          )
        }
        )}
      </Grid>

      <Grid container
        direction={"row"}
        size={"grow"}
        sx={{
          width: '100%',
          height: '500px',
          overflowY: 'auto', // Scroll vertical si el contenido excede el tamaño
          // background: "red",
          // border: '1px solid #ddd',
          // padding: 2,
        }}>
        <Grid container direction={"column"} sx={{ border: '1px solid #ddd' }} size={1 / 2}>
          {times.map((time) => {
            const value = `${time.format("HH:mm")}`
            return (
              <Grid size={{ xs: 12 }} key={`${time.toISOString()}`}
                sx={{ borderBottom: '1px solid #ddd' }}>
                {value}
              </Grid>);

          })}

        </Grid>
        {userTasks.map((userTask) => {
          const user = users.find(e => e.id == userTask.userId)
          return user && (
            <ScheduleColumn
              tasks={userTask.tasks}
              times={times}
              key={user.id} />
          )
        }
        )}
      </Grid>

    </Grid>
  );
};

export default ScheduleGrid;
