import { FC, ReactElement } from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import EventIcon from '@mui/icons-material/Event';
import UpdateIcon from '@mui/icons-material/Update';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import { SvgIconProps } from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import Swipper from '../../../components/layouts/Swipper';
import { useDataAnalytics } from '../../../hooks/analytics/useDataAnalytics';
import { TaskStatusEnum } from '../../../types/dataTypes';
import { Box } from '@mui/material';



interface TaskStatusKPI {
  key: TaskStatusEnum;
  title: string;
  value: number | string;
  icon?: ReactElement<SvgIconProps>;
  color?: string;
  unit?: string;
}


const TaskStatusKPIS: TaskStatusKPI[] = [
  {
    key: 'porHacer',
    title: 'Por Hacer',
    value: 0,
    icon: <AccessTimeIcon />,
    color: '#fb8c00',
  },
  {
    key: 'completado',
    title: 'Completado',
    value: 0,
    icon: <CheckCircleIcon />,
    color: '#43a047',
  },
  {
    key: 'programado',
    title: 'Programado',
    value: 0,
    icon: <EventIcon />,
    color: '#3949ab',
  },
  {
    key: 'reprogramado',
    title: 'Reprogramado',
    value: 0,
    icon: <UpdateIcon />,
    color: '#fdd835',
  },
  {
    key: 'bloqueado',
    title: 'Bloqueado',
    value: 0,
    icon: <BlockIcon />,
    color: '#e53935',
  },

  {
    key: 'noEjecutable',
    title: 'No Ejecutable',
    value: 0,
    icon: <DoNotDisturbIcon />,
    color: '#6d4c41',
  },
];


const TaskStatusSection: FC = () => {
  const { taskStatus } = useDataAnalytics();

  return (
    <Box component="div">
      <Typography variant="h4" sx={{ paddingLeft: 2 }}>
        Tareas por Estados
      </Typography>
      <Swipper movementStep={1.5}>
        {taskStatus && Object.entries(taskStatus).map(([key, value]) => {
          const kpi = TaskStatusKPIS.find(item => item.key === key);
          return (
            kpi &&
            <Paper
              key={key}
              elevation={3}
              sx={{
                flex: '0 0 auto',
                paddingY: 2,
                paddingX: 2,
                minWidth: 200,
                display: 'flex',
                alignItems: 'center',
                height: 'auto',
                overflow: 'hidden',
                borderRadius: 2
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
                  {value} {kpi.unit ?? ''}
                </Typography>
              </div>
            </Paper>
          )
        }
        )}
      </Swipper>
    </Box>
  );
};

export default TaskStatusSection;
