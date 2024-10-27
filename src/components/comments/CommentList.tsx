import { FC, useEffect, useState } from 'react';

import { Add } from '@mui/icons-material';
import { Box, IconButton, List, Paper, Typography } from '@mui/material';
import { ComentListProps } from '../../interfaces/ComponentInterfaces';
import { IssueComment, TaskComment } from '../../interfaces/ModelInterfaces';
import issueCommentStore from '../../stores/support/issueCommentStore';
import taskCommentStore from '../../stores/support/taskCommentStore';
import CommentFormDialog from '../forms/comments/CommentFormDialog';
import Comment from './Comment';

const CommentList: FC<ComentListProps> = ({ type, onSave }) => {
  const { taskComment, taskComments } = taskCommentStore();
  const { issueComment, issueComments } = issueCommentStore();

  const [comments, setComments] = useState<(IssueComment | TaskComment)[]>([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    type === 'task' && setComments(taskComments);
  }, [type, taskComments]);

  useEffect(() => {
    type === 'issue' && setComments(issueComments);
  }, [type, issueComments]);


  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="flex-start" mb={2} gap={1}>
        <Typography variant="h4" >
          Comentarios:
        </Typography>
        <IconButton color="primary" onClick={handleOpen}>
          <Add />
        </IconButton>
      </Box>
      <Paper elevation={3} sx={{ padding: 2, backgroundColor: 'background.paper' }}>
        {comments.length ? (<List>
          {comments.map((c) => <Comment key={c.id} comment={c} />)}
        </List>) : (
          <Typography variant="body1" color="text.secondary" align="left">
            No hay comentarios
          </Typography>
        )
        }
      </Paper>
      <CommentFormDialog
        open={open}
        type={type}
        issueComment={issueComment}
        taskComment={taskComment}
        onClose={handleClose}
        onConfirm={onSave}
      />
    </Box>
  );
};

export default CommentList;
