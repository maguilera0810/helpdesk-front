import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { LayoutDialogProps } from '../../interfaces/ComponentInterfaces';



const LayoutDialog: React.FC<LayoutDialogProps> = ({
  open,
  title,
  children,
  okText = "OK",
  cancelText = "Cancel",
  message,
  onOk,
  onCancel,
}) => {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        {message && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="textSecondary">
              {message}
            </Typography>
          </Box>
        )}
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">
          {cancelText}
        </Button>
        <Button onClick={onOk} color="primary" variant="contained">
          {okText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LayoutDialog;
