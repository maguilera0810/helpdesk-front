import React, { ReactNode } from 'react';

import LayoutDialog from '../layouts/LayoutDialog';


interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  okText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  children,
  okText = "Confirm",
  cancelText = "Cancel",
}) => {
  return (
    <LayoutDialog
      open={open}
      title={title}
      onCancel={onCancel}
      onOk={onConfirm}
      okText={okText}
      cancelText={cancelText}
      message={message}
    >
      {children}
    </LayoutDialog>
  );
};

export default ConfirmDialog;
