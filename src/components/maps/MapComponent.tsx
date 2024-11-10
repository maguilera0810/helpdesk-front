import React from 'react';

import { Box, Paper, Typography } from '@mui/material';
import { MapContainer, Popup, TileLayer } from 'react-leaflet';
import { useLocationInfo } from '../../hooks/settings/useLocationInfo';
import DraggableMarker from './DraggableMarcker';
// import L from 'leaflet';

// Crea un icono personalizado para el marcador (opcional)
// const customIcon = new L.Icon({
//   iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
//   shadowSize: [41, 41],
// });

interface MapComponentProps {
  title?: string;
  description?: string;
  isEditable?: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({ title, description, isEditable = false }) => {

  const { position } = useLocationInfo()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} >
      {title && <Typography variant="h6" gutterBottom>
        {title}
      </Typography>}
      <Paper elevation={3} sx={{ width: '100%', height: 400 }}>
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <DraggableMarker
            isDraggable={isEditable}>
            <Popup minWidth={90}>
              <Typography variant="subtitle1">{description || 'Ubicación seleccionada'}</Typography>
            </Popup>
          </DraggableMarker>
        </MapContainer>
      </Paper>
    </Box>
  );
};

export default MapComponent;
