import { useJsApiLoader } from '@react-google-maps/api';

export default function MapsLoader() {
  console.log(process.env.REACT_APP_API_GOOGLE_MAPS)
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_API_GOOGLE_MAPS,
  });

  return isLoaded
}
