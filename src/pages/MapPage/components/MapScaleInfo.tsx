import { useState } from 'react';
import { useMapEvent } from 'react-leaflet';

interface IProps {}

const calculateScale = (zoom: number, latitude: number) => {
  const EARTH_CIRCUMFERENCE = 40075000; // in meters
  const scale = (EARTH_CIRCUMFERENCE * Math.cos((latitude * Math.PI) / 180)) / (256 * Math.pow(2, zoom));
  return Math.round(scale);
};

export const MapScaleInfo = ({}: IProps) => {
  const [mapScale, setMapScale] = useState<number | null>(500);

  const map = useMapEvent('zoomend', () => {
    const getZoomScale = map.getZoom();

    const scale = calculateScale(getZoomScale, map.getCenter().lat);

    setMapScale(scale);
  });

  return (
    <>
      <span className='mr-2'>{mapScale} km</span>
      <div className='w-14 h-1 bg-black my-auto'></div>
    </>
  );
};
