import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


import { Box, Button, Grid, TextField } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import dayjs, { Dayjs } from 'dayjs';
import { useTask } from '../../../../hooks/useTask';
import { Task } from '../../../../interfaces/ModelInterfaces';
import useCategoryStore from '../../../../stores/useCategoryStore';
import useTaskStore from '../../../../stores/useTaskStore';
import useUserStore from '../../../../stores/useUserStore';
import { MultipleSelectField, SelectField } from '../../fields';
import TextAreaField from '../../fields/TextAreaField';

const gridItemProps = {
  xs: 12,
  sm: 6,
  md: 4,
  xl: 3,
};

const fieldProps = {
  fullWidth: true,
};

const typeOptions = [
  { value: 'preventive', label: 'Preventive' },
  { value: 'emergency', label: 'Emergency' },
];

const priorityOptions = [
  { value: 'lowest', label: 'Lowest' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'highest', label: 'Highest' },
];

const statusOptions = [
  { value: 'to_do', label: 'Por hacer' },
  { value: 'in_progress', label: 'En ejecucion' },
  { value: 'blocked', label: 'Bloqueado' },
  { value: 'scheduled', label: 'Programado' },
  { value: 'rescheduled', label: 'Reprogramado' },
  { value: 'executed', label: 'Ejecutado' },
  { value: 'to_validate', label: 'Por validar' },
  { value: 'completed', label: 'Completado' },
];

interface TaskBaseInfoProps {
  onSubmit?: (task: Partial<Task>) => void;
  onSuccess?: (taskId: number) => void;

}


const TaskBaseInfo: FC<TaskBaseInfoProps> = ({ onSubmit, onSuccess }) => {
  const { id } = useParams<{ id: string }>();
  const isUpdate = Boolean(id && id !== 'addNew');



  const { task, setTask } = useTaskStore()
  const { task: taskFetched, loading, success, method, createTask, updateTask } = useTask();

  const users = useUserStore((state) => state.users);
  const categories = useCategoryStore((state) => state.categories)

  const [formData, setFormData] = useState<Partial<Task>>({});

  useEffect(() => {
    if (task) {
      setFormData({
        ...task,
        createdAt: task.createdAt ? dayjs(task.createdAt).toDate() : undefined,
        updatedAt: task.updatedAt ? dayjs(task.updatedAt).toDate() : undefined,
      });
    }
  }, [task]);

  useEffect(() => {
    console.log(categories);
  }, [categories])


  useEffect(() => {
    if (taskFetched) {
      setTask(taskFetched);
    }
  }, [taskFetched])

  useEffect(() => {
    if (onSuccess && success === true && task && (method === 'createTask' || method === 'updateTask')) {
      console.log("entro");

      onSuccess(task.id);
    }
  }, [success]);

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

  const handleDateChange = (name: keyof Task) => (date: Dayjs | null) => {
    setFormData((prev) => ({
      ...prev,
      [name]: date?.toDate() || null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit && onSubmit(formData);
    if (isUpdate) {
      const taskId = parseInt(id as string);
      if (!isNaN(taskId)) {
        updateTask(taskId, formData);
      }
    } else {
      createTask(formData);
    }
  };


  const showField = () => {
    return isUpdate ? "block" : "none";
  }

  const buttonMsg = () => {
    if (loading) {
      return isUpdate ? 'Actualizando...' : 'Creando...';
    }
    return isUpdate ? 'Actualizar' : 'Crear';
  }



  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
      <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading} sx={{ mb: 2 }}>
        {buttonMsg()}
      </Button>
      <Grid container spacing={{ xs: 1 }}>
        <Grid item {...gridItemProps} key={"title"}>
          <TextField
            label="Title"
            name="title"
            value={formData.title ?? ''}
            onChange={(e) => handleInputChange(e)}
            {...fieldProps}
          />
        </Grid>
        <Grid item {...gridItemProps} key={"description"}>
          <TextAreaField
            label="Description"
            name="description"
            required={true}
            value={formData.description ?? ''}
            onChange={(e) => handleInputChange(e)}
            {...fieldProps}
          />
        </Grid>
        <Grid item {...gridItemProps} key={"code"} display={showField()}>
          <TextField
            label="Code"
            name="code"
            disabled={true}
            value={formData.code ?? ''}
            onChange={(e) => handleInputChange(e)}
            required
            {...fieldProps}
          />
        </Grid>
        <Grid item {...gridItemProps} key={"type"}>
          <SelectField
            label="Type"
            name="type"
            value={formData.type ?? typeOptions[0].value}
            options={typeOptions}
            onChange={(e) => handleInputChange(e)}
            fullWidth
            height="56px"
          />
        </Grid>
        <Grid item {...gridItemProps} key={"status"}>
          <SelectField
            label="Status"
            name="status"
            value={formData.status ?? statusOptions[0].value}
            options={statusOptions}
            onChange={(e) => handleInputChange(e)}
            fullWidth
            height="56px"
          />
        </Grid>
        <Grid item {...gridItemProps} key={"priority"}>
          <SelectField
            label="Priority"
            name="priority"
            value={formData.priority ?? priorityOptions[0].value}
            options={priorityOptions}
            onChange={(e) => handleInputChange(e)}
            fullWidth
            height="56px"
          />
        </Grid>
        <Grid item {...gridItemProps} key={"createdAt"}>
          <DateTimeField
            label="Created At"
            disabled={true}
            value={dayjs(formData.createdAt)}
            onChange={handleDateChange('createdAt')}
            {...fieldProps}
          />
        </Grid>
        <Grid item {...gridItemProps} key={"updatedAt"}>
          <DateTimeField
            label="Updated At"
            disabled={true}
            value={dayjs(formData.updatedAt)}
            onChange={handleDateChange('updatedAt')}
            {...fieldProps}
          />
        </Grid>
        <Grid item {...gridItemProps} key={"responsible"}>
          <SelectField
            label="Responsible"
            name="responsible"
            value={formData.responsible?.toString() ?? ''}
            options={users.map(user => ({ value: user.id.toString(), label: `${user.firstName} ${user.lastName}` }))}
            onChange={(e) => handleInputChange(e)}
            fullWidth
            height="56px"
          />
        </Grid>
        <Grid item {...gridItemProps} key={"team"}>
          <MultipleSelectField
            label="Team"
            name="team"
            value={formData.team?.map((e) => typeof e === 'number' && e.toString()) ?? []}
            options={users.map(user => ({ value: user.id.toString(), label: `${user.firstName} ${user.lastName}` }))}
            onChange={(e) => handleInputChange(e)}
            fullWidth
            height="auto"
          />
        </Grid>
        <Grid item {...gridItemProps} key={"categories"}>
          <MultipleSelectField
            label="Categories"
            name="categories"
            value={formData.categories?.map(e => typeof e === 'number' && e.toString()) ?? []}
            options={categories.map(category => {
              return {
                value: category.id.toString(),
                label: category.title,
                color: category.color,
              }


            })}
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskBaseInfo;