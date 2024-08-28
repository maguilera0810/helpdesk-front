import React from 'react';

import { Box, Paper } from '@mui/material';
import { DragPreviewImage, useDrag } from 'react-dnd';


export interface Item {
  id: number;
  text: string;
  img?: string;
}

interface DraggableItemProps {
  item: Item;
  moveItem: (id: number, toRight: boolean) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item, moveItem }) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'ITEM',
    item: { id: item.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <>
      {item.img && <DragPreviewImage connect={preview} src={item.img} />}
      <Paper
        ref={drag}
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
        {item.text}
      </Paper>
    </>
  );
};

export default DraggableItem;
