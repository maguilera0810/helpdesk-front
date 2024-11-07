import { FC, useMemo, useRef, useState } from 'react';

import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';


interface DraggableMarkerProps {
  isDraggable?: boolean;
  lat: number;
  lng: number;
}

const DraggableMarker: FC<DraggableMarkerProps> = ({ isDraggable = false, lat, lng }) => {
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
      <Popup minWidth={90}>
        <span>
          AQUI VA LA DIRECCION
        </span>
      </Popup>
    </Marker>
  )
}

export default DraggableMarker;