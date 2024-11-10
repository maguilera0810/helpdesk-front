import { FC, ReactNode, useMemo, useRef } from 'react';

import L from 'leaflet';
import { Marker } from 'react-leaflet';
import { useLocationInfo } from '../../hooks/settings/useLocationInfo';


interface DraggableMarkerProps {
  isDraggable?: boolean;
  children?: ReactNode;
}

const DraggableMarker: FC<DraggableMarkerProps> = ({ isDraggable = false, children }) => {
  const { position, setPosition } = useLocationInfo()
  const markerRef = useRef<L.Marker>(null)
  const eventHandlers = useMemo(() => ({
    dragend() {
      const marker = markerRef.current
      marker && setPosition(marker.getLatLng());
    },
  }), []);

  return (
    position &&
    <Marker
      draggable={isDraggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>
      {children}
    </Marker>
  )
}

export default DraggableMarker;