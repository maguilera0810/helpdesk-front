import React, { useState } from 'react';

import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';


import { Paper, Typography } from '@mui/material';

import DraggableItem, { Item } from './DraggableItem';
interface DropZoneProps {
  items: Item[];
  onDrop: (item: Item, toRight: boolean) => void;
  title: string;
  toRight: boolean;
}

const DropZone: React.FC<DropZoneProps> = ({ items, onDrop, title, toRight }) => {

  const [localItems, setLocalItems] = useState<Item[]>(items)

  const isOver = true;
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setLocalItems((localItems) => {
      const oldeIndex = localItems.findIndex(item => item.id === active.id)
      const newIndex = localItems.findIndex(item => item.id === over?.id)
      return arrayMove(localItems, oldeIndex, newIndex)
    })

  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={localItems} strategy={verticalListSortingStrategy}>
        <Paper
          sx={{
            padding: 1,
            minHeight: 200,
            backgroundColor: isOver ? '#e0f7fa' : '#f0f0f0',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          {localItems.map((item) => (
            <DraggableItem
              key={item.id}
              item={item}
            />
          ))}
        </Paper>
      </SortableContext>
    </DndContext>
  );
};

export default DropZone;
