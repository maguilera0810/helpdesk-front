import { FC, useEffect, useState } from 'react';

import { Box, List, Paper, Typography } from '@mui/material';
import { IssueComment, TaskComment } from '../../interfaces/ModelInterfaces';
import issueCommentStore from '../../stores/support/issueCommentStore';
import taskCommentStore from '../../stores/support/taskCommentStore';
import Comment from './Comment';

interface ComentListProps {
  type: 'issue' | 'task';
}

const CommentList: FC<ComentListProps> = ({ type }) => {
  const { taskComments } = taskCommentStore();
  const { issueComments } = issueCommentStore();
  const [comments, setComments] = useState<(IssueComment | TaskComment)[]>([]);

  useEffect(() => {
    if (type === 'task') {
      setComments(taskComments);
    }
  }, [type, taskComments]);

  useEffect(() => {
    if (type === 'issue') {
      setComments(issueComments);
    }
  }, [type, issueComments]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Comentarios
      </Typography>
      <Paper elevation={3} sx={{ padding: 2, backgroundColor: 'background.paper' }}>
        <List>
          {comments.map((c) => <Comment key={c.id} comment={c} />)}
        </List>
      </Paper>
    </Box>
  );
};

export default CommentList;
