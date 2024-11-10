import { FC, useEffect } from 'react';

import LocationForm from '../../../components/forms/settings/location/LocationForm';
import Layout from '../../../components/layouts/Layout';
import locationStore from '../../../stores/settings/locationInfoStore';


const LocationDetail: FC = () => {
  const { clearState } = locationStore();

  useEffect(() => {
    return () => clearState?.();
  }, [])

  return (
    <Layout>
      <LocationForm />
    </Layout>
  );
};


export default LocationDetail;
