import React, { ReactNode } from 'react';

import CheckCircle from '@mui/icons-material/CheckCircle';
import Error from '@mui/icons-material/Error';
import Info from '@mui/icons-material/Info';
import QuestionMark from '@mui/icons-material/QuestionMark';
import Warning from '@mui/icons-material/Warning';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


interface DialogComponentProps {
  open: boolean;
  variant: 'alert' | 'confirm' | 'error' | 'info' | 'success';
  title: string;
  message?: string;
  okText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  children?: ReactNode;
}

const variantConfig = {
  alert: {
    icon: <Warning color="warning" />,
    color: 'warning',
    defaultOkText: 'OK',
    defaultCancelText: 'Cancel',
  },
  confirm: {
    icon: <QuestionMark color="success" />,
    color: 'primary',
    defaultOkText: 'Yes',
    defaultCancelText: 'No',
  },
  error: {
    icon: <Error color="error" />,
    color: 'error',
    defaultOkText: 'OK',
    defaultCancelText: 'Cancel',
  },
  info: {
    icon: <Info color="info" />,
    color: 'info',
    defaultOkText: 'OK',
    defaultCancelText: 'Cancel',
  },
  success: {
    icon: <CheckCircle color="success" />,
    color: 'success',
    defaultOkText: 'OK',
    defaultCancelText: '',
  },
};

const DialogComponent: React.FC<DialogComponentProps> = ({
  open,
  variant,
  title,
  message,
  onConfirm,
  onCancel,
  children,
  okText,
  cancelText,
}) => {
  const { icon, color, defaultOkText, defaultCancelText } = variantConfig[variant];

  return (
    <Dialog open={open} onClose={onCancel} aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title" sx={{ display: 'flex', alignItems: 'center' }}>
        {title}
        {icon}
      </DialogTitle>
      <DialogContent>
        {message &&
          <DialogContentText>
            {message}
          </DialogContentText>}
        {children}
      </DialogContent>
      <DialogActions>
        {onCancel &&
          <Button onClick={onCancel} color={color as 'inherit' | 'primary' | 'secondary'}>
            {cancelText ?? defaultCancelText}
          </Button>
        }
        {onConfirm &&
          <Button onClick={onConfirm} variant="contained" color={color as 'inherit' | 'primary' | 'secondary'}>
            {okText ?? defaultOkText}
          </Button>}
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
