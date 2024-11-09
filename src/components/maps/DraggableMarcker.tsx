import { FC, ReactNode, useMemo, useRef, useState } from 'react';

import L from 'leaflet';
import { Marker } from 'react-leaflet';


interface DraggableMarkerProps {
  isDraggable?: boolean;
  lat: number;
  lng: number;
  children?: ReactNode;
}

const DraggableMarker: FC<DraggableMarkerProps> = ({ isDraggable = false, lat, lng, children }) => {
  // const [draggable, setDraggable] = useState(isDraggable);
  const [position, setPosition] = useState({ lat, lng });
  const markerRef = useRef<L.Marker>(null)
  const eventHandlers = useMemo(() => ({
    dragend() {
      const marker = markerRef.current
      if (marker != null) {
        setPosition(marker.getLatLng())
      }
    },
  }), []);

  // const toggleDraggable = useCallback(() => {
  //   setDraggable((d) => !d)
  // }, [])

  return (
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