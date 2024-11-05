import { FC, ReactElement } from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventIcon from '@mui/icons-material/Event';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import { SvgIconProps } from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import Swipper from '../../../components/layouts/Swipper';
import { useDataAnalytics } from '../../../hooks/analytics/useDataAnalytics';
import { IssueStatusEnum } from '../../../types/dataTypes';



interface IssueStatusKPI {
  key: IssueStatusEnum;
  title: string;
  value: number | string;
  icon?: ReactElement<SvgIconProps>;
  color?: string;
  unit?: string;
}


const IssueStatusKPIS: IssueStatusKPI[] = [
  {
    key: 'recibido',
    title: 'Recibido',
    value: 0,
    icon: <AccessTimeIcon />,
    color: '#fb8c00',
  },
  {
    key: 'tareaCreada',
    title: 'Tarea Creada',
    value: 0,
    icon: <EventIcon />,
    color: '#3949ab',
  },
  {
    key: 'completado',
    title: 'Completado',
    value: 0,
    icon: <CheckCircleIcon />,
    color: '#43a047',
  },
  {
    key: 'rechazado',
    title: 'Rechazado',
    value: 0,
    icon: <EventIcon />,
    color: '#3949ab',
  },
];


const TaskStatusSection: FC = () => {
  const { issueStatus } = useDataAnalytics();

  return (
    <Swipper movementStep={1.5}>
      {issueStatus && Object.entries(issueStatus).map(([key, value]) => {
        const kpi = IssueStatusKPIS.find(item => item.key === key);
        return (
          kpi &&
          <Paper
            key={key}
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
                {value} {kpi.unit ?? ''}
              </Typography>
            </div>
          </Paper>
        )
      }

      )}
    </Swipper>
  );
};

export default TaskStatusSection;
