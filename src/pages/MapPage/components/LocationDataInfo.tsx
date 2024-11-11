import { useState } from 'react';
import { useMapEvent } from 'react-leaflet';

export const LocationDataInfo = () => {
  const [mousemoveLocation, setMousemoveLocation] = useState({ lat: 0, lng: 0 });

  const HandleMapMousemove = () => {
    useMapEvent('mousemove', async (event) => {
      const { lat, lng } = event.latlng;
      setMousemoveLocation({ lat, lng });
    });

    return null;
  };

  return (
    <>
      <span className='min-w-40'>Lat: {mousemoveLocation?.lat ?? '-'}</span>
      <span className='min-w-40'>Lon: {mousemoveLocation?.lng ?? '-'}</span>
      <HandleMapMousemove />
    </>
  );
};
