import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import dayjs, { Dayjs } from 'dayjs';

import CircleIcon from '@mui/icons-material/Circle';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { SelectChangeEvent } from '@mui/material/Select';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { Stack, Typography } from '@mui/material';
import { useTask } from '../../../../hooks/useTask';
import { Task } from '../../../../interfaces/ModelInterfaces';
import useTaskStore from '../../../../stores/useTaskStore';
import useUserStore from '../../../../stores/useUserStore';
import MultipleSelectField from '../../fields/MultipleSelectField';
import SelectField from '../../fields/SelectField';
import ScheduleGrid from './schedule/ScheduleGrid';

const gridCol1Props = {
  size: {
    xs: 12,
    sm: 6,
    md: 3,
    xl: 2,
  }
};
const gridCol2Props = {
  size: {
    xs: 12,
    sm: 6,
    md: 9,
    xl: 10,
  }
};
const gridItemProps = {
  size: {
    xs: 12,
    sm: 12,
    // md: 12,
    // xl: 6,
  }
};

type stateType = 'ocupado' | 'colision' | 'propuesta' | 'actual'
const STATES: stateType[] = ['ocupado', 'colision', 'propuesta', 'actual'];

const SCHEDULE_ITEMS = {
  ocupado: {
    label: 'ocupado',
    style: {
      color: "#FF7043",
    }
  },
  colision: {
    label: 'colision',
    style: {
      color: "#D32F2F",
    }
  },
  propuesta: {
    label: 'propuesta',
    style: {
      color: '#FFC107'
    }
  },
  actual: {
    label: 'actual',
    style: {
      color: "#2196F3",
    }
  }

}

interface TaskScheduleProps {
  onSubmit?: (task: Partial<Task>) => void;
  onSuccess?: (taskId: number) => void;

}

const TaskSchedule: FC<TaskScheduleProps> = ({ onSubmit, onSuccess }) => {
  const { id } = useParams<{ id: string }>();
  const isUpdate = Boolean(id && id !== 'addNew');

  const [formData, setFormData] = useState<Partial<Task>>({});

  const {
    task, startAt, endAt,
    setTask, setSchedule, setCurrDate, setStartAt, setEndAt,
  } = useTaskStore()
  const {
    task: taskFetched, schedule, loading, success, method,
    updateTask, fetchSchedule,
  } = useTask();
  const users = useUserStore((state) => state.users);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const aux = {
      ...formData,
      startAt: startAt?.toDate(),
      endAt: endAt?.toDate(),
    }
    onSubmit && onSubmit(aux);
    if (isUpdate) {
      const taskId = parseInt(id as string);
      if (!isNaN(taskId)) {
        updateTask(taskId, aux);
      }
    }
  };

  useEffect(() => {
    if (task) {
      setFormData({
        ...task,
        createdAt: task.createdAt ? dayjs(task.createdAt).toDate() : undefined,
        updatedAt: task.updatedAt ? dayjs(task.updatedAt).toDate() : undefined,
        startAt: task.startAt ? dayjs(task.startAt).toDate() : undefined, // capaz fale y se deba usar dayjs type
        endAt: task.endAt ? dayjs(task.endAt).toDate() : undefined, // capaz fale y se deba usar dayjs type
      });
      setCurrDate(task.startAt ? dayjs(task.startAt) : null)
      setStartAt(task.startAt ? dayjs(task.startAt) : null);
      setEndAt(task.endAt ? dayjs(task.endAt) : null);
    }
  }, [task]);

  useEffect(() => {
    if (taskFetched) {
      setTask(taskFetched);
    }
  }, [taskFetched])

  useEffect(() => {
    if (onSuccess && success === true && task && (method === 'createTask' || method === 'updateTask')) {
      onSuccess(task.id);
    }
  }, [success]);

  useEffect(() => {
    if (!(formData.responsible && startAt && endAt)) {
      return;
    }

    task && fetchSchedule({
      responsibleId: formData.responsible,
      team: formData.team ?? [],
      startAt: startAt.toDate(),
      endAt: endAt.toDate(),
      currTaskId: task.id
    })

  }, [formData.responsible, formData.team, startAt, endAt])

  useEffect(() => {
    schedule && setSchedule(schedule);
  }, [schedule])

  const buttonMsg = () => {
    if (loading) {
      return isUpdate ? 'Actualizando...' : 'Creando...';
    }
    return isUpdate ? 'Agendar' : 'Reagendar';
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> | SelectChangeEvent<any[]>) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDateChange = (type: "start" | "end", newDate: Dayjs | null) => {
    const cleanDate = newDate ? newDate.set('second', 0).set('millisecond', 0) : newDate;
    if (type === 'start') {
      setCurrDate(cleanDate);
      setStartAt(cleanDate);
    } else {
      setEndAt(cleanDate);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
      <Grid container spacing={1} alignItems={"center"} alignContent={"center"}>
        <Grid container spacing={1} alignItems={"center"} alignContent={"center"} direction="row">
          <Button onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading || schedule?.hasCollision} sx={{ mb: 2, height: 50 }}>
            {buttonMsg()}
          </Button>
          {schedule?.hasCollision && <Alert severity="error" sx={{ mb: 2, height: 50 }}>Hay un conflicto.</Alert>}
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid container direction="column" spacing={1} {...gridCol1Props}>
          <Grid {...gridItemProps}>
            <DateTimePicker
              label="Inicio"
              value={startAt}
              minutesStep={30}
              format={'DD/MM/YYYY, HH:mm'}
              views={['year', 'month', 'day', 'hours', 'minutes']}
              ampm={false}
              displayWeekNumber={true}
              showDaysOutsideCurrentMonth={true}
              slotProps={{ textField: { fullWidth: true }, }}
              // viewRenderers={{ hours: renderDigitalClockTimeView, }}
              onChange={(newDate) => handleDateChange('start', newDate)}
            />
          </Grid>
          <Grid {...gridItemProps}>
            <DateTimePicker
              label="Fin"
              value={endAt}
              minutesStep={30}
              format={'DD/MM/YYYY, HH:mm'}
              views={['year', 'month', 'day', 'hours', 'minutes']}
              ampm={false}
              displayWeekNumber={true}
              showDaysOutsideCurrentMonth={true}
              slotProps={{ textField: { fullWidth: true }, }}
              // viewRenderers={{ hours: renderDigitalClockTimeView, }}
              onChange={(newDate) => handleDateChange('end', newDate)}
            />
          </Grid>
          <Grid key={"responsible"} {...gridItemProps}>
            <SelectField
              label="Responsable"
              name="responsible"
              value={formData.responsible ?? ''}
              options={users.map(user => ({ value: user.id, label: `${user.firstName} ${user.lastName}` }))}
              onChange={(e) => handleInputChange(e)}
              fullWidth
              height="56px"
            />
          </Grid>
          <Grid key={"team"} {...gridItemProps}>
            <MultipleSelectField
              label="Equipo"
              name="team"
              value={formData.team ?? []}
              options={users.map(user => ({ value: user.id, label: `${user.firstName} ${user.lastName}` }))}
              onChange={(e) => handleInputChange(e)}
              fullWidth
              height="auto"
            />
          </Grid>
          <Grid key={"leyend"} {...gridItemProps}>
            <Stack direction={'column'} spacing={{ xs: 0 }}>
              {STATES.map((state) => {
                return (
                  <Typography key={state}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'initial',
                    }}>
                    <CircleIcon sx={{
                      margin: 0, padding: 0,
                      ...SCHEDULE_ITEMS[state].style
                    }} />
                    {SCHEDULE_ITEMS[state].label}
                  </Typography>);
              })}
            </Stack>

          </Grid>
        </Grid>
        <Grid container {...gridCol2Props}>
          <ScheduleGrid />
        </Grid>
      </Grid>
    </Box>
  );
}



export default TaskSchedule;