import { FC } from 'react';


import { SxProps, Theme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useNavigate } from 'react-router-dom';

import { ScheduleColumnProps, ScheduleItemProps } from '../../../../../interfaces/ComponentInterfaces';
import useTaskStore from '../../../../../stores/support/useTaskStore';


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
  },
  colision: {
    label: 'colision',
    style: {
      border: '1px solid #D32F2F',
      background: "#D32F2F",
      cursor: 'pointer',
    }
  },
  propuesta: {
    label: 'propuesta',
    style: {
      border: '1px solid #FFC107',
      background: '#FFC107'
    }
  },
  actual: {
    label: 'actual',
    style: {
      border: '1px solid #2196F3',
      background: "#2196F3",
    }
  }

}

const ScheduleItem: FC<ScheduleItemProps> = ({ type, time, task, onClick }) => {
  const isStart = time.isSame(task?.startAt);
  const style = { ...gridStyle, ...SCHEDULE_ITEMS[type].style }
  if (type === 'disponible') {
    return (
      <Grid size={{ xs: 12 }} key={`${time.toISOString()}`}
        sx={style}>

      </Grid>);
  } else if (type === 'propuesta') {
    return (
      <Grid size={{ xs: 12 }} key={`${time.toISOString()}`}
        sx={style}>
        {SCHEDULE_ITEMS[type].label.toUpperCase()}
      </Grid>);
  } else if (type === 'ocupado') {
    return (
      <Grid size={{ xs: 12 }} key={`${time.toISOString()} ${task?.id}`}
        onClick={() => onClick?.(task?.id as number)}
        sx={style}>
        {task?.title.toUpperCase()}
      </Grid>);
  } else if (type === 'colision') {
    return (
      <Grid size={{ xs: 12 }} key={`${time.toISOString()} ${task?.id}`}
        onClick={() => onClick?.(task?.id as number)}
        sx={style}>
        {task?.title.toUpperCase()}
        {/* - {SCHEDULE_ITEMS[type].label.toUpperCase()} */}
      </Grid>);
  } else if (type === 'actual') {
    return (
      <Grid size={{ xs: 12 }} key={`${time.toISOString()} ${task?.id}`}
        sx={style}>
        {SCHEDULE_ITEMS[type].label.toUpperCase()}
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

  const getType = (currTime: Dayjs) => {
    if (!checkIsPropuesta(currTime)) {
      return 'disponible'
    }

    return ''
  }

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
          const currType = task.hasCollision ? 'colision' : 'ocupado';
          return (
            <ScheduleItem type={currType} task={task} time={time}
              onClick={() => handleTaskClick(task.id)}
              key={time.toISOString()}
            />);

        }
        if (dayjs(task.startAt).isSame(startAt, 'minute') && dayjs(task.endAt).isSame(endAt, 'minute')) {
          return (
            <ScheduleItem type='actual' task={task} time={time}
              onClick={() => handleTaskClick(task.id)}
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

