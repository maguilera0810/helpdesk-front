import React, { FC, useEffect, useState } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useIssueComment } from '../../hooks/support/useIssueComment';
import { useTaskComment } from '../../hooks/support/useTaskComment';
import { CommentFormDialogProps } from '../../interfaces/ComponentInterfaces';
import { IssueComment, TaskComment } from '../../interfaces/ModelInterfaces';
import issueCommentStore from '../../stores/support/issueCommentStore';
import taskCommentStore from '../../stores/support/taskCommentStore';


const CommentFormDialog: FC<CommentFormDialogProps> = ({ open, type, taskComment, issueComment,
  onConfirm, onClose }) => {

  const { taskComment: taskCommentFetched, success: successTask, method: methodTask, createTaskComment, updateTaskComment } = useTaskComment();
  const { issueComment: issueCommentFetched, success: successIssue, method: methodIssue, createIssueComment, updateIssueComment } = useIssueComment();
  const { issue } = issueCommentStore();
  const { task } = taskCommentStore();
  const [formData, setFormData] = useState<Partial<IssueComment | TaskComment>>({});


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (taskComment?.id) {
      updateTaskComment(taskComment.id, formData);
    } else if (issueComment?.id) {
      updateIssueComment(issueComment.id, formData);
    } else if (type === 'task') {
      createTaskComment(formData);
    } else if (type === 'issue') {
      createIssueComment(formData);
    }
  };

  const handleClose = () => {
    setFormData({});
    onClose?.()
  }
  useEffect(() => {
    issue && setFormData((prev) => ({ ...prev, issue: issue?.id }));
    issueComment && setFormData((prev) => ({ ...prev, ...issueComment }));
  }, [issue, issueComment]);

  useEffect(() => {
    task && setFormData((prev) => ({ ...prev, task: task?.id }));
    taskComment && setFormData((prev) => ({ ...prev, ...taskComment }));
  }, [task, taskComment]);

  useEffect(() => {
    if (successIssue && issueCommentFetched && (methodIssue === 'createIssueComment' || methodIssue === 'updateIssueComment')) {
      onConfirm?.();
      handleClose();
    }
  }, [successIssue, methodIssue, issueCommentFetched])
  useEffect(() => {
    if (successTask && taskCommentFetched && (methodTask === 'createTaskComment' || methodTask === 'updateTaskComment')) {
      onConfirm?.();
      handleClose();
    }
  }, [successTask, methodTask, taskCommentFetched])

  return (
    <Dialog id="comentario"
      open={open}
      onClose={handleClose}
      fullWidth
    >
      <DialogTitle>{issueComment ? 'Editar Comentario' : 'Agregar Comentario'}</DialogTitle>
      <DialogContent id="contenido">
        <TextField
          fullWidth
          margin="dense"
          label="Asunto"
          name="title"
          value={formData.title ?? ''}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Contenido"
          name="description"
          multiline
          rows={4}
          value={formData.description ?? ''}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          {Boolean(issueComment || taskComment) ? 'Actualizar' : 'Guardar'}
        </Button>
      </DialogActions>
    </Dialog>

  );
};

export default CommentFormDialog;
