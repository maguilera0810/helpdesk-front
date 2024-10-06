import { FC } from "react";


import { Box, CssBaseline } from '@mui/material';
import Layout from '../../../components/layouts/Layout.tsx';


const TaskTrackingDetail: FC = () => {
  return (
    <Layout>
      <Box
        sx={{
          marginTop: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CssBaseline />
      </Box>
    </Layout>
  );
}


export default TaskTrackingDetail