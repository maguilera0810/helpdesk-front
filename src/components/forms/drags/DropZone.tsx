import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useDrop } from 'react-dnd';
import DraggableItem, { Item } from './DraggableItem';

interface DropZoneProps {
  items: Item[];
  onDrop: (item: Item, toRight: boolean) => void;
  title: string;
  toRight: boolean;
}

const DropZone: React.FC<DropZoneProps> = ({ items, onDrop, title, toRight }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item: Item) => onDrop(item, toRight),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <Paper
      ref={drop}
      sx={{
        padding: 2,
        minHeight: 200,
        backgroundColor: isOver ? '#e0f7fa' : '#f0f0f0',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {items.map((item) => (
        <DraggableItem key={item.id} item={item} moveItem={() => onDrop(item, toRight)} />
      ))}
    </Paper>
  );
};

export default DropZone;
