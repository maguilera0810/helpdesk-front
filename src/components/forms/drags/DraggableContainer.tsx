import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import DropZone from './DropZone';
import { Item } from './DraggableItem';

const initialLeftItems: Item[] = [
  { id: 1, text: 'Item 1', img: 'https://via.placeholder.com/32' },
  { id: 2, text: 'Item 2', img: 'https://via.placeholder.com/32' },
  { id: 3, text: 'Item 3', img: 'https://via.placeholder.com/32' },
];

const initialRightItems: Item[] = [
  { id: 4, text: 'Item 4', img: 'https://via.placeholder.com/32' },
  { id: 5, text: 'Item 5', img: 'https://via.placeholder.com/32' },];

const DraggableContainer: React.FC = () => {
  const [leftItems, setLeftItems] = useState<Item[]>(initialLeftItems);
  const [rightItems, setRightItems] = useState<Item[]>(initialRightItems);

  const handleDrop = (item: Item, toRight: boolean) => {
    if (toRight) {
      setRightItems((prevItems) => [...prevItems, item]);
      setLeftItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    } else {
      setLeftItems((prevItems) => [...prevItems, item]);
      setRightItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <DropZone
            items={leftItems}
            onDrop={handleDrop}
            title="Left Zone"
            toRight={true}
          />
        </Grid>
        <Grid item xs={6}>
          <DropZone
            items={rightItems}
            onDrop={handleDrop}
            title="Right Zone"
            toRight={false}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DraggableContainer;
