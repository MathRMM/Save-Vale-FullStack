import { useMemo, useCallback, useState } from 'react';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import MapsLoader from './mapsLoader';

export default function Map({ address, expand }) {
  const isLoaded = MapsLoader();
  console.log(isLoaded);
  const text = address.map(
    (addr) => `${addr.street}, ${addr.number}, ${addr.number}, ${addr.City.name} - ${addr.City.State.name}`
  );
  const location = address.map((addr) => ({
    lat: Number(addr.lat),
    lng: Number(addr.lng),
  }));

  const center = useMemo(() => location, [location]);

  return isLoaded ? (
    <GoogleMap zoom={13} center={center[0]} mapContainerClassName="map">
      {center.map(point => (
        <MarkerF position={point} />
      ))}
    </GoogleMap>
  ) : (
    <>Loading...</>
  );
}
