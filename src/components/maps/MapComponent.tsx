import React from 'react';

import { Box, Paper, Typography } from '@mui/material';
import L from 'leaflet';
import { MapContainer, Popup, TileLayer } from 'react-leaflet';
import DraggableMarker from './DraggableMarcker';

// Crea un icono personalizado para el marcador (opcional)
const customIcon = new L.Icon({
  iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
  shadowSize: [41, 41],
});

interface MapComponentProps {
  lat: number;
  lng: number;
  title?: string;
  description?: string;
  isDraggable?: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({ lat, lng, title, description, isDraggable = false }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6" gutterBottom>
        {title || 'Mapa de Ubicación'}
      </Typography>
      <Paper elevation={3} sx={{ width: '100%', height: 400 }}>
        <MapContainer
          center={[lat, lng]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <DraggableMarker isDraggable={isDraggable} lat={lat} lng={lng} >
            <Popup minWidth={90}>
              <Typography variant="subtitle1">{description || 'Ubicación seleccionada'}</Typography>
            </Popup>
          </DraggableMarker>
          {/* <Marker position={[lat, lng]} icon={customIcon}>
            <Popup>
              <Typography variant="subtitle1">{description || 'Ubicación seleccionada'}</Typography>
            </Popup>
          </Marker> */}
        </MapContainer>
      </Paper>
    </Box>
  );
};

export default MapComponent;
