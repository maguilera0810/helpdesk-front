import React, { useEffect, useRef } from 'react';

import { Box, Paper, Typography } from '@mui/material';
import { Map as LeafletMap } from 'leaflet';
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
  isEditable?: boolean;
  zoom?: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ title, isEditable = false, zoom = 15 }) => {

  const { position, locationData, reverseGeocode } = useLocationInfo()
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (!position) return;
    reverseGeocode();
    mapRef.current && mapRef.current.setView([position.lat, position.lng], zoom);
  }, [position])


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} >
      {title && <Typography variant="h6" gutterBottom>{title}</Typography>}
      <Paper elevation={3} sx={{ width: '100%', height: 400 }}>
        {position &&
          <MapContainer
            center={position}
            zoom={zoom}
            style={{ height: '100%', width: '100%' }}
            ref={(ref) => { if (ref) { mapRef.current = ref; } }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <DraggableMarker
              isDraggable={isEditable}>
              {locationData &&
                <Popup minWidth={90}>
                  <Typography variant="body2">{locationData?.display_name}</Typography>
                </Popup>}
            </DraggableMarker>
          </MapContainer>}
      </Paper>
    </Box>
  );
};

export default MapComponent;
