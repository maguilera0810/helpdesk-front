import { FC, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid2';
import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useNavigate } from 'react-router-dom';


import { Task } from '../../../../../interfaces/ModelInterfaces';
import useTaskStore from '../../../../../stores/useTaskStore';


dayjs.extend(utc);
dayjs.extend(timezone);

interface ScheduleColumnProps {
  tasks: Partial<Task>[];
  times: Dayjs[];
}

interface GridTaskProps {
  type: 'disponible' | 'ocupado' | 'propuesta' | 'actual';
  time: Dayjs;
  task?: Partial<Task>;
  onClick?: ((id: number) => void) | (() => void);
}



const GridTask: FC<GridTaskProps> = ({ type, time, task, onClick }) => {
  if (type === 'disponible') {
    return (
      <Grid size={{ xs: 12 }} key={`${time.toISOString()}`}
        sx={{
          borderBottom: '1px solid #ddd',
          background: '#fff',
        }}>
        DISPONIBLE
      </Grid>);
  } else if (type === 'ocupado') {
    return (
      <Grid size={{ xs: 12 }} key={`${time.toISOString()} ${task?.id}`}
        sx={{
          border: '1px solid #ba000d',
          background: "#ba000d",
          cursor: 'pointer',
        }}
        onClick={() => onClick?.(task?.id as number)}
      >
        {task?.title}
      </Grid>);
  } else if (type === 'propuesta') {
    return <Grid size={{ xs: 12 }} key={`${time.toISOString()}`}
      sx={{
        borderBottom: '1px solid #00bcd4',
        background: '#00bcd4'
      }}>
      PROPUESTA
    </Grid>;
  } else if (type === 'actual') {
    return (<Grid size={{ xs: 12 }} key={`${time.toISOString()} ${task?.id}`}
      sx={{
        border: '1px solid #757ce8',
        background: "#757ce8",
        cursor: 'pointer',
      }}
    >
      ACTUAL
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
            <GridTask type={checkIsPropuesta(time) ? 'propuesta' : 'disponible'}
              time={time} key={time.toISOString()} />);
        }
        const current = currTask && currTask.id === task.id
        if (!current) {
          return (
            <GridTask type='ocupado' task={task} time={time}
              onClick={() => handleTaskClick(task.id as number)}
              key={time.toISOString()}
            />);

        }
        if (dayjs(task.startAt).isSame(startAt, 'minute') && dayjs(task.endAt).isSame(endAt, 'minute')) {
          return (
            <GridTask type='actual' task={task} time={time}
              onClick={() => handleTaskClick(task.id as number)}
              key={time.toISOString()}
            />);
        }
        return (
          <GridTask type={checkIsPropuesta(time) ? 'propuesta' : 'disponible'}
            time={time} key={time.toISOString()} />);


      })}

    </Grid>

  );
};

export default ScheduleColumn;




// tritones
// fosforecente

