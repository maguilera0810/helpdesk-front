import axios from 'axios';
import { useCallback, useState } from 'react';

import { LocationData } from '../../interfaces/GlobalInterfaces';
import { LocationInfo } from '../../interfaces/ModelInterfaces';
import LocationService from '../../services/settings/LocationService';
import locationStore from '../../stores/settings/locationInfoStore';
import { methodLocation } from '../../types/methodTypes';


export const useLocationInfo = () => {
  const {
    location, setLocation,
    locationData, setLocationData,
    locations, setLocations,
    position, setPosition,
  } = locationStore()
  const [method, setMethod] = useState<methodLocation | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const fetchLocations = useCallback(async (filters: { [key: string]: any } = {}) => {
    setMethod('fetchLocations');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const resp = await LocationService.list(filters);
      setLocations(resp);
      setSuccess(true);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setError('Error fetching locations');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchLocation = async (locationId: number) => {
    setMethod('fetchLocation');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const resp = await LocationService.retrieve(locationId);
      setLocation(resp);
      setSuccess(true);
      return resp;
    } catch (error) {
      console.error(`Error fetching location with id ${locationId}:`, error);
      setError('Error fetching location');
    } finally {
      setLoading(false);
    }
  };

  const createLocation = async (location: Partial<LocationInfo>) => {
    setMethod('createLocation');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const resp = await LocationService.create(location);
      setLocation(resp);
      setSuccess(true);
    } catch (error) {
      console.error('Error creating location:', error);
      setError('Error creating location');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const updateLocation = async (locationId: number, location: Partial<LocationInfo>) => {
    setMethod('updateLocation');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const resp = await LocationService.update(locationId, location);
      setLocation(resp);
      setSuccess(true);
    } catch (error) {
      console.error(`Error updating location with id ${locationId}:`, error);
      setError('Error updating location');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const deleteLocation = async (locationId: number) => {
    setMethod('deleteLocation');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await LocationService.destroy(locationId);
      setSuccess(true);
    } catch (error) {
      console.error(`Error deleting location with id ${locationId}:`, error);
      setError('Error deleting location');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const reverseGeocode = async () => {
    setMethod('reverseGeocode');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const resp = await axios.get<LocationData>(
        `https://nominatim.openstreetmap.org/reverse`,
        {
          params: {
            lat: position?.lat,
            lon: position?.lng,
            format: 'json',
          },
        }
      );
      setLocationData(resp.data)
      setSuccess(true);
    } catch (error) {
      console.error(`Error deleting location with id (${position?.lat}, ${position?.lng}):`, error);
      setError('Error deleting location');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    location,
    locationData,
    position,
    locations,
    loading,
    error,
    success,
    method,
    setPosition,
    setLocation,
    fetchLocations,
    fetchLocation,
    createLocation,
    updateLocation,
    deleteLocation,
    reverseGeocode,
  };
};
