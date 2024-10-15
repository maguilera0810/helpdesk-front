import { FC, ReactNode, useRef, useState } from 'react';

import Box from '@mui/material/Box';

interface SwipperProps {
  movementStep?: number;// Multiplier to make the movement faster
  children?: ReactNode;
  gap?: number;
}
const Swipper: FC<SwipperProps> = ({ children, movementStep = 2, gap = 2 }) => {

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const dragThreshold: number = 5; // Distance threshold to differentiate click and drag

  const handleMouseDown = (e: React.MouseEvent) => {
    if (containerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
      document.body.style.userSelect = 'none';
    }
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * movementStep;
    if (Math.abs(x - startX) > dragThreshold) {
      setIsDragging(true);
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };
  const handleMouseUp = () => {
    document.body.style.userSelect = 'auto';
    setIsDragging(false);
  };
  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };
  return (
    <Box
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      sx={{
        display: 'flex',
        overflowX: 'auto',
        padding: 2,
        width: { xs: '95vw', sm: '100%' },
        gap,
        cursor: isDragging ? 'grabbing' : 'pointer',
        userSelect: isDragging ? 'none' : 'auto',
        scrollbarWidth: 'none',
        scrollbarColor: '#888 #f1f1f1',
        scrollbarGutter: 'stable'
      }}
    >
      {children}
    </Box>
  );
};

export default Swipper;
