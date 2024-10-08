import { FC } from 'react';


import { SxProps, Theme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useNavigate } from 'react-router-dom';

import { ScheduleColumnProps, TrackingItemProps } from '../../../interfaces/ComponentInterfaces';


dayjs.extend(utc);
dayjs.extend(timezone);

const gridStyle: SxProps<Theme> = {
  height: '1.4rem',
};

const SCHEDULE_ITEMS = {
  disponible: {
    label: 'disponible',
    style: {
      color: '#F4F4F4',
      border: '1px solid #ddd',
      background: '#FDFDFD',
    }
  },
  ocupado: {
    label: 'ocupado',
    style: {
      border: '1px solid #FF7043',
      background: "#FF7043",
      cursor: 'pointer',
    }
  }

}

const TrackingItem: FC<TrackingItemProps> = ({ type, time, task, onClick }) => {
  const style = { ...gridStyle, ...SCHEDULE_ITEMS[type].style }
  if (type === 'disponible') {
    return (
      <Grid size={{ xs: 12 }} key={`${time.toISOString()}`}
        sx={style}>

      </Grid>);
  } else if (type === 'ocupado') {
    return (
      <Grid size={{ xs: 12 }} key={`${time.toISOString()} ${task?.id}`}
        onClick={() => onClick?.(task?.id as number)}
        sx={style}>
        {task?.title.toUpperCase()}
      </Grid>);
  }
}



const TrackingColumn: FC<ScheduleColumnProps> = ({ tasks, times }) => {

  const navigate = useNavigate();
  const handleTaskClick = (taskId: number) => {
    navigate(`/soporte/tareas/${taskId}/`);
  };

  return (
    <Grid container direction={"column"} sx={{ border: '1px solid #ddd' }} size={"grow"}>
      {times.map((time) => {
        const task = tasks.find((task) => (dayjs(task.startAt).isSame(time, 'minute') ||
          (dayjs(task.startAt).isBefore(time, 'minute') && dayjs(task.endAt).isAfter(time, 'minute'))
        ))
        if (task) {
          return (
            <TrackingItem type='ocupado' task={task} time={time}
              onClick={() => handleTaskClick(task.id)}
              key={time.toISOString()}
            />);
        }
        return (
          <TrackingItem type='disponible'
            time={time} key={time.toISOString()} />);


      })}

    </Grid>

  );
};

export default TrackingColumn;




// tritones
// fosforecente

