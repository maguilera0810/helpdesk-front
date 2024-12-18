import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import dayjs, { Dayjs } from 'dayjs';

import { taskTypeOptions } from '../../../../constants';
import { taskStatuses } from '../../../../constants/states';
import { useTask } from '../../../../hooks/support/useTask';
import useGlobalData from '../../../../hooks/useGlobalData';
import { Task } from '../../../../interfaces/ModelInterfaces';
import categoryStore from '../../../../stores/settings/categoryStore';
import taskStore from '../../../../stores/support/taskStore';
import { BaseChangeMethod } from '../../../../types/methodTypes';
import { getSubmitMsg } from '../../../../utils/messageUtils';
import { MultipleSelectField, SelectField } from '../../fields';
import TextAreaField from '../../fields/TextAreaField';

const gridItemProps = {
  size: {
    xs: 12,
    sm: 6,
    md: 4,
    xl: 3,
  }
};

const fieldProps = {
  fullWidth: true,
};


interface TaskBaseInfoProps {
  onSubmit?: (task: Partial<Task>) => void;
  onSuccess?: (taskId: number) => void;

}


const TaskBaseInfo: FC<TaskBaseInfoProps> = ({ onSubmit, onSuccess }) => {
  const { id } = useParams<{ id: string }>();
  const isUpdate = Boolean(id && id !== 'addNew');

  const { priorities } = useGlobalData();
  const { task } = taskStore()
  const { loading, createTask, updateTask } = useTask();
  const { categories } = categoryStore();
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

  const handleInputChange: BaseChangeMethod<any> = (e) => {
    const { name, value } = e.target;
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

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
      <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading} sx={{ mb: 2 }}>
        {getSubmitMsg(loading, isUpdate)}
      </Button>
      <Grid container spacing={{ xs: 1 }}>
        <Grid {...gridItemProps} key={"title"}>
          <TextField
            label="Título"
            name="title"
            value={formData.title ?? ''}
            onChange={(e) => handleInputChange(e)}
            {...fieldProps}
          />
        </Grid>
        <Grid {...gridItemProps} key={"description"}>
          <TextAreaField
            label="Descripción"
            name="description"
            required={true}
            value={formData.description ?? ''}
            onChange={(e) => handleInputChange(e)}
            {...fieldProps}
          />
        </Grid>
        <Grid {...gridItemProps} key={"code"} display={showField()}>
          <TextField
            label="Código"
            name="code"
            disabled={true}
            value={formData.code ?? ''}
            onChange={(e) => handleInputChange(e)}
            required
            {...fieldProps}
          />
        </Grid>
        <Grid {...gridItemProps} key={"type"}>
          <SelectField
            label="Tipo"
            name="type"
            value={formData.type ?? taskTypeOptions[0].value}
            options={taskTypeOptions}
            onChange={(e) => handleInputChange(e)}
            fullWidth
            height="56px"
          />
        </Grid>
        <Grid {...gridItemProps} key={"status"}>
          <SelectField
            label="Estado"
            name="status"
            value={formData.status ?? ''}
            options={taskStatuses}
            onChange={(e) => handleInputChange(e)}
            fullWidth
            height="56px"
          />
        </Grid>
        <Grid {...gridItemProps} key={"priority"}>
          <SelectField
            label="Prioridad"
            name="priority"
            value={formData.priority ?? ''}
            options={priorities.map(e => ({ value: e.id, label: e.title }))}
            onChange={(e) => handleInputChange(e)}
            fullWidth
            height="56px"
          />
        </Grid>
        <Grid {...gridItemProps} key={"createdAt"}>
          <DateTimeField
            label="Creado"
            disabled={true}
            value={dayjs(formData.createdAt)}
            onChange={handleDateChange('createdAt')}
            {...fieldProps}
          />
        </Grid>
        <Grid {...gridItemProps} key={"updatedAt"}>
          <DateTimeField
            label="Actualizado"
            disabled={true}
            value={dayjs(formData.updatedAt)}
            onChange={handleDateChange('updatedAt')}
            {...fieldProps}
          />
        </Grid>
        <Grid {...gridItemProps} key={"categories"}>
          <MultipleSelectField
            label="Categorias"
            name="categories"
            value={formData.categories ?? []}
            options={categories.map(e => ({ value: e.id, label: e.title }))}
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskBaseInfo;