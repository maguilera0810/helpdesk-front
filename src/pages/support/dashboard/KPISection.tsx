import { FC, ReactElement, useRef, useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { SvgIconProps } from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import Swipper from '../../../components/layouts/Swipper';


// Definición de la interfaz para los datos del KPI
interface KPI {
  key: string;
  title: string;
  value: number | string;
  icon?: ReactElement<SvgIconProps>;
  color?: string;
  unit?: string; // Opcional: para añadir unidad de medida, si se necesita
}

interface KPIGridProps {
  kpis: KPI[];
}


const KPISection: FC<KPIGridProps> = ({ kpis }) => {

  return (
    <Swipper movementStep={1.5}>
      {kpis.map((kpi) => (
        <Paper
          key={kpi.key}
          elevation={3}
          sx={{
            flex: '0 0 auto',
            padding: 2,
            minWidth: 200,
            display: 'flex',
            alignItems: 'center',
            height: '100px',
            overflow: 'hidden',
          }}
        >
          {kpi.icon && (
            <Avatar
              sx={{
                bgcolor: kpi.color ?? 'primary.main',
                marginRight: 2,
                width: 36,
                height: 36,
              }}
            >
              {kpi.icon}
            </Avatar>
          )}
          <div>
            <Typography variant="body2" component="div" sx={{ fontWeight: 'bold' }}>
              {kpi.title}
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 'bold',
                color: kpi.color ?? 'text.primary',
                fontSize: '1rem',
              }}
            >
              {kpi.value} {kpi.unit ?? ''}
            </Typography>
          </div>
        </Paper>
      ))}
    </Swipper>
    // <Box
    //   ref={containerRef}
    //   onMouseDown={handleMouseDown}
    //   onMouseMove={handleMouseMove}
    //   onMouseUp={handleMouseUp}
    //   onMouseLeave={handleMouseUp}
    //   sx={{
    //     display: 'flex',
    //     overflowX: 'auto',
    //     padding: 2,
    //     width: { xs: '95vw', sm: '100%' },
    //     gap: 2,
    //     cursor: isDragging ? 'grabbing' : 'pointer',
    //     userSelect: isDragging ? 'none' : 'auto', // Deshabilitar selección de texto
    //     // scrollbarWidth: 'thin',
    //     scrollbarWidth: 'none',
    //     scrollbarColor: '#888 #f1f1f1',
    //     scrollbarGutter: 'stable'
    //   }}
    // >

    // </Box>
  );
};

export default KPISection;
