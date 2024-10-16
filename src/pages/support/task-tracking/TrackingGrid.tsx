import { FC, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { UserTask } from '../../../interfaces/ModelInterfaces';
import useTaskStore from '../../../stores/support/taskStore';
import useUserStore from '../../../stores/admin/useUserStore';
import TrackingColumn from './TrackingColum';

dayjs.extend(utc);
dayjs.extend(timezone);

const TrackingGrid: FC = () => {

  const { schedule, currDate } = useTaskStore()
  const { users } = useUserStore();
  const [times, setTimes] = useState<Dayjs[]>([])
  const [userTasks, setUserTasks] = useState<UserTask[]>([])

  useEffect(() => {
    if (currDate && schedule) {
      const localStart = schedule.minTime ? dayjs(schedule.minTime).tz("America/Guayaquil") : dayjs(schedule.minTime).startOf("day").add(6, 'hours').tz("America/Guayaquil");
      const diffInMinutes = localStart.endOf("day").diff(localStart, 'minutes');
      const intervals = Math.ceil(diffInMinutes / 30);
      setTimes(Array.from({ length: intervals }, (_, i) => localStart.add(i * 30, 'minutes')));
    } else {
      setTimes([]);
    }
  }, [currDate, schedule])

  useEffect(() => {
    setUserTasks(schedule ? schedule.userTasks : [])
  }, [schedule])

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
        <Grid key={"time"} size={1}>
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
        <Grid container direction={"column"} sx={{ border: '1px solid #ddd' }} size={1}>
          {times.map((time) => {
            const initTime = `${time.format("HH:mm")}`
            const endTime = `${time.add(30, 'minute').format("HH:mm")}`
            return (
              <Grid size={{ xs: 12 }} key={`${time.toISOString()}`}
                sx={{

                  height: '1.4rem',
                  border: '1px solid #ddd',
                  background: '#F0F0F0',
                }}>
                <Typography sx={{ fontSize: '0.7rem' }}>
                  {initTime} - {endTime}
                </Typography>
              </Grid>);

          })}

        </Grid>
        {userTasks.map((userTask) => {
          const user = users.find(e => e.id == userTask.userId)
          return user && (
            <TrackingColumn
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

export default TrackingGrid;
