import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import dayjs, { Dayjs } from 'dayjs';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { SelectChangeEvent } from '@mui/material/Select';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { useTask } from '../../../../hooks/useTask';
import { Task } from '../../../../interfaces/ModelInterfaces';
import useTaskStore from '../../../../stores/useTaskStore';
import useUserStore from '../../../../stores/useUserStore';
import MultipleSelectField from '../../fields/MultipleSelectField';
import SelectField from '../../fields/SelectField';

const gridColProps = {
  size: {
    xs: 12,
    sm: 6,
    md: 2,
    // xl: 3,
  }
};
const gridItemProps = {
  size: {
    xs: 6,
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


  const [currDate, setCurrDate] = useState<Dayjs | null>(dayjs());
  const [startAt, setStartAt] = useState<Dayjs | null>(dayjs());
  const [endAt, setEndAt] = useState<Dayjs | null>(dayjs().add(1, 'hour'));

  const { task, setTask } = useTaskStore()
  const { task: taskFetched, loading, success, method, updateTask } = useTask();
  const users = useUserStore((state) => state.users);

  const [formData, setFormData] = useState<Partial<Task>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setFormData((prev) => ({
    //   ...prev,
    //   startAt: startAt?.toISOString(),
    //   endAt: endAt?.toISOString(),
    // }));
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
        startAt: task.startAt ? dayjs(task.startAt).toDate() : undefined, // capaz fale y se deba usar dayjs type
        endAt: task.endAt ? dayjs(task.endAt).toDate() : undefined, // capaz fale y se deba usar dayjs type
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

  useEffect(() => {
    console.log("cambio");
    let userIds: string[] = []
    if (formData.responsible) { userIds.push(formData.responsible.toString()) }
    if (formData.team) {
      console.log('si entro', formData.team.map(e => e.toString()));
      userIds = userIds.concat(formData.team.map(e => e.toString()))
    }
    console.log(userIds, formData.startAt, formData.endAt);

  }, [formData.responsible, formData.team])

  const showField = () => {
    return isUpdate ? "block" : "none";
  }

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



  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
      <Grid container spacing={1} alignItems={"center"} alignContent={"center"}>
        <Grid>
          <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading} sx={{ mb: 2 }}>
            {buttonMsg()}
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid container direction="column" spacing={1} {...gridColProps}>
          <Grid key={"responsible"} {...gridItemProps}>
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
          <Grid key={"team"} {...gridItemProps}>
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
          <Grid {...gridItemProps}>
            <DateTimePicker
              label="Fecha y hora de inicio"
              value={startAt}
              onChange={(newDate) => setStartAt(newDate)}
            />
          </Grid>
          <Grid {...gridItemProps}>
            <DateTimePicker
              label="Fecha y hora de fin"
              value={endAt}
              onChange={(newDate) => setEndAt(newDate)}
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