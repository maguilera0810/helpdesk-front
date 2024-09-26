import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import dayjs, { Dayjs } from 'dayjs';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { SelectChangeEvent } from '@mui/material/Select';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

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

interface TaskScheduleProps {
  onSubmit?: (task: Partial<Task>) => void;
  onSuccess?: (taskId: number) => void;

}

const TaskSchedule: FC<TaskScheduleProps> = ({ onSubmit, onSuccess }) => {
  const { id } = useParams<{ id: string }>();
  const isUpdate = Boolean(id && id !== 'addNew');


  const [currDay, setCurrDay] = useState<Dayjs | null>(dayjs());

  const { task, startAt, endAt, setTask, setUserTasks,
    setCurrDate, setStartAt, setEndAt } = useTaskStore()
  const { task: taskFetched, schedule, loading, success, method, updateTask, fetchSchedule } = useTask();
  const users = useUserStore((state) => state.users);

  const [formData, setFormData] = useState<Partial<Task>>({});

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

    fetchSchedule({
      responsibleId: formData.responsible,
      team: formData.team ?? [],
      startAt: startAt.toDate(),
      endAt: endAt.toDate()
    })

  }, [formData.responsible, formData.team, startAt, endAt])

  useEffect(() => {
    if (schedule && schedule.userTasks.length > 0) {
      setUserTasks(schedule.userTasks);
    }
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
    if (type === 'start') {
      setCurrDate(newDate)
      setStartAt(newDate)
    } else {
      setEndAt(newDate)
    }
  }


  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
      <Grid container spacing={1} alignItems={"center"} alignContent={"center"}>
        <Grid>
          <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading} sx={{ mb: 2 }}>
            {buttonMsg()}
          </Button>
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid container direction="column" spacing={1} {...gridCol1Props}>
          <Grid {...gridItemProps}>
            <DateTimePicker
              label="Inicio"
              value={startAt}
              onChange={(newDate) => handleDateChange('start', newDate)}
            />
          </Grid>
          <Grid {...gridItemProps}>
            <DateTimePicker
              label="Fin"
              value={endAt}
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
        </Grid>
        <Grid container {...gridCol2Props}>
          <ScheduleGrid />
        </Grid>
      </Grid>
    </Box>
  );
}



export default TaskSchedule;