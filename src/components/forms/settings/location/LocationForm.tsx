import React, { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Paper, Tab, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { SelectChangeEvent } from '@mui/material/Select';
import { latLng } from 'leaflet';
import { useLocationInfo } from '../../../../hooks/settings/useLocationInfo';
import { LocationInfo } from '../../../../interfaces/ModelInterfaces';
import { getSubmitMsg } from '../../../../utils/messageUtils';
import MapComponent from '../../../maps/MapComponent';
import TextAreaField from '../../fields/TextAreaField';

const gridSizes1 = {
  xs: 12,
  // sm: 12,
  md: 6,

};
const gridSizes2 = {
  xs: 12,
  // sm: 6,
  // md: 4,
  // xl: 3,
};

const fieldProps = {
  fullWidth: true,
};

const LocationForm: FC = () => {
  const navigate = useNavigate();
  const { locationId } = useParams<{ locationId: string }>();

  const {
    location, fetchLocation, createLocation, updateLocation,
    position, setPosition,
    loading, success, error, method,
  } = useLocationInfo();

  const [formData, setFormData] = useState<Partial<LocationInfo>>({});
  const [tabValue, setTabValue] = useState('0');
  const isUpdate = Boolean(locationId && locationId !== 'addNew');


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> | SelectChangeEvent<any[]>) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePositionChange = (name: "lat" | "lng", value: string) => {
    const cleanValue = parseFloat(value);
    if (isNaN(cleanValue)) return;
    const lat = name === 'lat' ? cleanValue : (position?.lat ?? 0);
    const lng = name === 'lng' ? cleanValue : (position?.lng ?? 0);
    setPosition(latLng(lat, lng));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location) {
      updateLocation(location.id, formData);
    } else {
      createLocation(formData);
    }
  };

  const handleTabLisChange = (e: SyntheticEvent, newValue: string) => {
    e.preventDefault();
    setTabValue(newValue);
  };

  useEffect(() => {
    if (position) {
      setFormData((prev) => ({
        ...prev,
        lat: position.lat,
        lng: position.lng,
      }));
    }
  }, [position])

  useEffect(() => {
    if (isUpdate && locationId) {
      const id = parseInt(locationId);
      !isNaN(id) && fetchLocation(id);
    }
  }, [locationId]);

  useEffect(() => {
    if (location) {
      setFormData({ ...location });
      setPosition(latLng(location.lat, location.lng));
    }
  }, [location]);

  useEffect(() => {
    if (success && location && (method === 'createLocation' || method === 'updateLocation')) {
      navigate(`/configuraciones/locacion/${location.id}/`);
    }
  }, [success]);

  return (
    <Paper elevation={3} sx={{ p: 1, borderRadius: 2, width: '100%', overflow: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Locación</Typography>
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading} sx={{ mt: 3, mb: 2 }}>
        {getSubmitMsg(loading, isUpdate)}
      </Button>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
          <TabList onChange={handleTabLisChange} aria-label="location form tabs">
            <Tab label="Información" value="0" />
          </TabList>
        </Box>
        <TabPanel value="0">
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
            <Grid container spacing={{ xs: 1 }} >
              <Grid container rowSpacing={{ xs: 1 }} size={{ ...gridSizes1, md: 4 }}
                alignContent={"flex-start"}
              >
                <Grid size={gridSizes2} key={"title"}>
                  <TextField
                    label="Título"
                    name="title"
                    value={formData.title ?? ''}
                    onChange={(e) => handleInputChange(e)}
                    {...fieldProps}
                  />
                </Grid>
                <Grid size={gridSizes2} key={"address"}>
                  <TextAreaField
                    label="Dirección"
                    name="address"
                    value={formData.address ?? ''}
                    onChange={(e) => handleInputChange(e)}
                    {...fieldProps}
                  />
                </Grid>
                <Grid size={{ ...gridSizes2, md: 6 }} key={"lat"}>
                  <TextField
                    label="Lat"
                    name="lat"
                    type='number'
                    value={position?.lat ?? 0}
                    onChange={(e) => handlePositionChange("lat", e.target.value)}
                    {...fieldProps}
                  />
                </Grid>
                <Grid size={{ ...gridSizes2, md: 6 }} key={"lng"}>
                  <TextField
                    label="Lng"
                    name="lng"
                    type='number'
                    value={position?.lng ?? 0}
                    onChange={(e) => handlePositionChange("lng", e.target.value)}
                    {...fieldProps}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={{ xs: 1 }} size={{ ...gridSizes1, md: 8 }}>
                <Grid size={12} key={"map"}>
                  <MapComponent isEditable />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
      </TabContext>
    </Paper>
  );
};

export default LocationForm;