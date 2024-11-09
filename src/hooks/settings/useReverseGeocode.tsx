import axios from 'axios';
import { useEffect, useState } from 'react';

interface LocationData {
  display_name: string;
  address?: {
    city?: string;
    country?: string;
    country_code?: string;
    postcode?: string;
    road?: string;
    state?: string;
  };
}

interface UseReverseGeocodeResult {
  location: LocationData | null;
  isLoading: boolean;
  error: string | null;
}

const useReverseGeocode = (lat: number, lng: number): UseReverseGeocodeResult => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lat || !lng) return;

    const fetchLocation = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get<LocationData>(
          `https://nominatim.openstreetmap.org/reverse`,
          {
            params: {
              lat,
              lon: lng,
              format: 'json',
            },
          }
        );
        setLocation(response.data);
      } catch (err) {
        setError("Error al obtener la ubicación");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, [lat, lng]);

  return {
    location,
    isLoading,
    error,
  };
};

export default useReverseGeocode;
