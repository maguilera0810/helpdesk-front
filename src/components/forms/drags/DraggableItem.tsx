import React from 'react';

import { Box, Paper } from '@mui/material';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
export interface Item {
  id: number;
  text: string;
  img?: string;
}

interface DraggableItemProps {
  item: Item;
  moveItem?: (id: number, toRight: boolean) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item }) => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: item.id
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,

  }

  const isDragging = true;
  return (
    <Paper
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      sx={{
        padding: 2,
        marginBottom: 1,
        backgroundColor: isDragging ? '#f0f0f0' : '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {item.img && (
        <Box
          component="img"
          src={item.img}
          alt={item.text}
          sx={{ width: 32, height: 32, marginRight: 1 }}
        />
      )}
      {item.text} Hola
    </Paper>
  );
};

export default DraggableItem;
