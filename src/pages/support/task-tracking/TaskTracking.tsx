import { ChangeEvent, FC, useState } from "react";

import { Box, SelectChangeEvent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import MultipleSelectField from "../../../components/forms/fields/MultipleSelectField.tsx";
import Layout from '../../../components/layouts/Layout.tsx';


const gridSizes = {
  xs: 12,
  sm: 6,
  md: 4,
  xl: 3,
};

const TaskTracking: FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<object>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> | SelectChangeEvent<any[]>) => {
    const { name, value } = e.target;

    if (name) {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value
      }));
    }
  };
  const handleSubmit = () => {

  }
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Seguimiento de Tareas
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
        <Grid container spacing={1} alignItems={"start"} alignContent={"start"} justifyContent={"start"}  >
          <Grid size={gridSizes} key={"date"}>
            <DatePicker
              label='Día'
              sx={{ width: '100%' }}
              defaultValue={dayjs()}
            />
          </Grid>
          <Grid size={gridSizes} key={"personal"}>
            <MultipleSelectField
              value={[]}
              onChange={handleInputChange}
              label={'Personal'}
              name={'personal'}
              options={[]} />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}


export default TaskTracking