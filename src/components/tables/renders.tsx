import { Avatar, Box, Chip } from "@mui/material";
import { User } from "../../interfaces/ModelInterfaces";

export const renderChipCell = (elem: any) => {
  let bgcolor: string = 'lightgray'
  let title: string = 'N/A'
  if (elem) {
    bgcolor = elem.color ?? 'lightgray';
    title = elem.title;
  }
  return (
    <Chip
      label={title}
      sx={{
        bgcolor,
        color: '#FFF',
        height: '1.5rem',
        '& .MuiChip-label': {
          fontSize: 12,
          fontWeight: 'bold',
        },
      }}
    />
  );
};


export const renderUserCell = (user?: Partial<User>, color: string = 'blue') => {
  let text: string = '';
  let title: string = 'N/A';
  if (user?.firstName && user?.lastName) {
    title = `${user.firstName} ${user.lastName}`
    text = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  }
  return (
    <Chip
      label={title}
      variant="outlined"
      sx={{
        // bgcolor: color,
        // color: '#FFF',
        // height: '2rem',
        // '& .MuiChip-label': {
        //   fontSize: 12,
        //   fontWeight: 'bold',
        // },
      }}
      avatar={
        <Avatar sx={{
          color: '#FFF',
          width: 'auto',
          fontSize: 10
        }} >
          {text}
        </Avatar>}
    />
  );
};