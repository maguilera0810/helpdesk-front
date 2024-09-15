import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import dayjs, { Dayjs } from 'dayjs';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { SelectChangeEvent } from '@mui/material/Select';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import { useTask } from '../../../../hooks/useTask';
import { Task } from '../../../../interfaces/ModelInterfaces';
import useTaskStore from '../../../../stores/useTaskStore';
import useUserStore from '../../../../stores/useUserStore';
import MultipleSelectField from '../../fields/MultipleSelectField';
import SelectField from '../../fields/SelectField';

const gridItemProps = {
  size: {
    xs: 12,
    sm: 6,
    md: 4,
    xl: 3,
  }
};
import { useParams } from 'react-router-dom';

import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { SelectChangeEvent } from '@mui/material/Select';

import { useTask } from '../../../../hooks/useTask';
import { Task } from '../../../../interfaces/ModelInterfaces';
import useTaskStore from '../../../../stores/useTaskStore';
import useUserStore from '../../../../stores/useUserStore';
import MultipleSelectField from '../../fields/MultipleSelectField';
import SelectField from '../../fields/SelectField';

const gridItemProps = {
  size: {
    xs: 12,
    sm: 6,
    md: 4,
    xl: 3,
  }
};

interface TaskScheduleProps {
  onSubmit?: (task: Partial<Task>) => void;
  onSuccess?: (taskId: number) => void;

}

const TaskSchedule: FC<TaskScheduleProps> = ({ onSubmit, onSuccess }) => {
  const { id } = useParams<{ id: string }>();
  const isUpdate = Boolean(id && id !== 'addNew');

  const { task, setTask } = useTaskStore()
  const { task: taskFetched, loading, success, method, updateTask } = useTask();

  const users = useUserStore((state) => state.users);

  const [formData, setFormData] = useState<Partial<Task>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit && onSubmit(formData);
    if (isUpdate) {
      const taskId = parseInt(id as string);
      if (!isNaN(taskId)) {
        updateTask(taskId, formData);
      }
    }
  };

  useEffect(() => {
    if (task) {
      console.log(task);
      setFormData({
        ...task,
        createdAt: task.createdAt ? dayjs(task.createdAt).toDate() : undefined,
        updatedAt: task.updatedAt ? dayjs(task.updatedAt).toDate() : undefined,
      });
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

  const showField = () => {
    return isUpdate ? "block" : "none";
  }

  const buttonMsg = () => {
    if (loading) {
      return isUpdate ? 'Actualizando...' : 'Creando...';
    }
    return isUpdate ? 'Actualizar' : 'Crear';
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> | SelectChangeEvent<any[]>) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name) {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
      <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading} sx={{ mb: 2 }}>
        {buttonMsg()}
      </Button>
      <Grid container>
        <Grid container
          direction="column"
          spacing={1}
          {...gridItemProps}>
          <Grid>
            Calendario
          </Grid>
          <Grid key={"responsible"}>
            <SelectField
              label="Responsable"
              name="responsible"
              value={formData.responsible?.toString() ?? ''}
              options={users.map(user => ({ value: user.id.toString(), label: `${user.firstName} ${user.lastName}` }))}
              onChange={(e) => handleInputChange(e)}
              fullWidth
              height="56px"
            />
          </Grid>
          <Grid key={"team"}>
            <MultipleSelectField
              label="Equipo"
              name="team"
              value={formData.team?.map((e) => typeof e === 'number' ? e.toString() : e) ?? []}
              options={users.map(user => ({ value: user.id.toString(), label: `${user.firstName} ${user.lastName}` }))}
              onChange={(e) => handleInputChange(e)}
              fullWidth
              height="auto"
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid>
            Horarios
          </Grid>

        </Grid>
      </Grid>
    </Box>
  );
}



export default TaskSchedule;