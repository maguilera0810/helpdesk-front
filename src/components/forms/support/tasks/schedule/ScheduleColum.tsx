import { FC } from 'react';

import Grid from '@mui/material/Grid2';
import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useNavigate } from 'react-router-dom';


import { GridTaskProps, ScheduleColumnProps } from '../../../../../interfaces/ComponentInterfaces';
import useTaskStore from '../../../../../stores/useTaskStore';


dayjs.extend(utc);
dayjs.extend(timezone);


const SCHEDULE_ITEMS = {
  disponible: {
    label: 'disponible',
    style: {
      borderBottom: '1px solid #ddd',
      background: '#fff',
    }
  },
  ocupado: {
    label: 'ocupado',
    style: {
      border: '1px solid #ba000d',
      background: "#ba000d",
      cursor: 'pointer',
    }
  },
  propuesta: {
    label: 'propuesta',
    style: {
      borderBottom: '1px solid #00bcd4',
      background: '#00bcd4'
    }
  },
  actual: {
    label: 'actual',
    style: {
      border: '1px solid #757ce8',
      background: "#757ce8",
      cursor: 'pointer',
    }
  }

}

const ScheduleItem: FC<GridTaskProps> = ({ type, time, task, onClick }) => {
  if (type === 'disponible') {
    return (
      <Grid size={{ xs: 12 }} key={`${time.toISOString()}`}
        sx={SCHEDULE_ITEMS[type].style}>
        {SCHEDULE_ITEMS[type].label}
      </Grid>);
  } else if (type === 'ocupado') {
    return (
      <Grid size={{ xs: 12 }} key={`${time.toISOString()} ${task?.id}`}
        onClick={() => onClick?.(task?.id as number)}
        sx={SCHEDULE_ITEMS[type].style}>
        {task?.title}
      </Grid>);
  } else if (type === 'propuesta') {
    return <Grid size={{ xs: 12 }} key={`${time.toISOString()}`}
      sx={SCHEDULE_ITEMS[type].style}>
      {SCHEDULE_ITEMS[type].label}
    </Grid>;
  } else if (type === 'actual') {
    return (<Grid size={{ xs: 12 }} key={`${time.toISOString()} ${task?.id}`}
      sx={SCHEDULE_ITEMS[type].style}>
      {SCHEDULE_ITEMS[type].label}
    </Grid>);
  }
}



const ScheduleColumn: FC<ScheduleColumnProps> = ({ tasks, times }) => {

  const navigate = useNavigate();
  const { task: currTask, startAt, endAt } = useTaskStore()

  const handleTaskClick = (taskId: number) => {
    navigate(`/soporte/tareas/${taskId}/`);
  };

  const checkIsPropuesta = (currTime: Dayjs) => dayjs(startAt).isSame(currTime, 'minute') ||
    (dayjs(startAt).isBefore(currTime, 'minute') && dayjs(endAt).isAfter(currTime, 'minute'));


  return (
    <Grid container direction={"column"} sx={{ border: '1px solid #ddd' }} size={"grow"}>
      {times.map((time) => {
        const task = tasks.find((task) => (dayjs(task.startAt).isSame(time, 'minute') ||
          (dayjs(task.startAt).isBefore(time, 'minute') && dayjs(task.endAt).isAfter(time, 'minute'))
        ))
        if (!task) {
          return (
            <ScheduleItem type={checkIsPropuesta(time) ? 'propuesta' : 'disponible'}
              time={time} key={time.toISOString()} />);
        }
        const current = currTask && currTask.id === task.id
        if (!current) {
          return (
            <ScheduleItem type='ocupado' task={task} time={time}
              onClick={() => handleTaskClick(task.id as number)}
              key={time.toISOString()}
            />);

        }
        if (dayjs(task.startAt).isSame(startAt, 'minute') && dayjs(task.endAt).isSame(endAt, 'minute')) {
          return (
            <ScheduleItem type='actual' task={task} time={time}
              onClick={() => handleTaskClick(task.id as number)}
              key={time.toISOString()}
            />);
        }
        return (
          <ScheduleItem type={checkIsPropuesta(time) ? 'propuesta' : 'disponible'}
            time={time} key={time.toISOString()} />);


      })}

    </Grid>

  );
};

export default ScheduleColumn;




// tritones
// fosforecente

