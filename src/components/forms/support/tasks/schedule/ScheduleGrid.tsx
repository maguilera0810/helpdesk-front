import { FC, useEffect, useState } from 'react';


import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { UserTask } from '../../../../../interfaces/ModelInterfaces';
import useTaskStore from '../../../../../stores/support/useTaskStore';
import useUserStore from '../../../../../stores/useUserStore';
import ScheduleColumn from './ScheduleColum';

dayjs.extend(utc);
dayjs.extend(timezone);

interface ScheduleGridProps {

}

const ScheduleGrid: FC<ScheduleGridProps> = () => {

  const { schedule, currDate } = useTaskStore()
  const users = useUserStore((state) => state.users);
  const [times, setTimes] = useState<Dayjs[]>([])
  const [userTasks, setUserTasks] = useState<UserTask[]>([])

  useEffect(() => {
    if (currDate) {
      const localTime = dayjs(currDate).tz("America/Guayaquil");
      setTimes(Array.from({ length: 24 * 2 }, (_, i) => localTime.startOf('day').add(i * 30, 'minutes')));
    } else {
      setTimes([]);
    }
  }, [currDate])


  useEffect(() => {
    console.log('ScheduleGrid.schedule', schedule);
    schedule && setUserTasks(schedule.userTasks)
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
                <Typography sx={{fontSize:'0.7rem'}}>
                  {initTime} - {endTime}
                </Typography>
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
