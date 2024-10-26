import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React from 'react';

import dayjs from 'dayjs';
import { IssueComment, TaskComment } from '../../interfaces/ModelInterfaces';

interface CommentProps {
  comment: IssueComment | TaskComment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {

  const getUserFullName = (isShort: boolean = false) => {
    if (typeof comment.createdBy === 'number') return '';
    const firstName = comment.createdBy.firstName ?? '';
    const lastName = comment.createdBy.firstName ?? '';
    return isShort ?
      `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() :
      `${firstName} ${lastName}`;
  }


  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "blue", marginRight: 2 }} >{getUserFullName(true)}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={comment.title}
          secondary={
            <>
              <Typography component="span" variant="body2" color="text.secondary">
                {getUserFullName()}
                {' — '}
                {dayjs(comment.createdAt).format('DD/MM/YYYY HH:mm')}
              </Typography>
              <Typography variant="body1" color="text.primary" sx={{ marginTop: 1 }}>
                {comment.description}
              </Typography>
              {/* {comment.files?.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 1 }}>
                  {comment.files.map((file, index) => (
                    <Chip key={index} label={file} color="primary" variant="outlined" />
                  ))}
                </Box>
              )} */}
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default Comment;
