import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Box, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { CommentProps } from '../../interfaces/ComponentInterfaces';


const Comment: FC<CommentProps> = ({ comment }) => {

  const navigate = useNavigate();

  const getUserFullName = (isShort: boolean = false) => {
    if (typeof comment.createdBy === 'number') return '';
    const firstName = comment.createdBy.firstName ?? '';
    const lastName = comment.createdBy.lastName ?? '';
    return isShort ?
      `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() :
      `${firstName} ${lastName}`;
  }

  const handleUserClick = () => {
    if (typeof comment.createdBy !== 'number') {
      navigate(`/administracion/usuario/${comment.createdBy.id}`);
    }
  };

  return (
    <>
      <ListItem alignItems="flex-start" sx={{ margin: 0, padding: 0 }}>
        <ListItemAvatar onClick={handleUserClick} sx={{ cursor: 'pointer' }}>
          <Avatar sx={{ bgcolor: "primary.main" }} >
            <Typography variant="body1">
              {getUserFullName(true)}
            </Typography>
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography component="span" variant="h6">
              {comment.title}
            </Typography>
          }
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
                onClick={handleUserClick}
                sx={{ fontSize: '0.8rem', cursor: 'pointer' }}>
                {getUserFullName()}{' — '}{dayjs(comment.createdAt).format('DD/MM/YYYY HH:mm')}
              </Typography>
              <Box component="span" color="text.primary" sx={{ display: 'block', marginTop: 1, fontSize: '1rem' }}>
                {comment.description}
              </Box>
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
