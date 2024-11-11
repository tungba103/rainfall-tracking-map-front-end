import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { LocationDataInfo } from './LocationDataInfo';
import { MapScaleInfo } from './MapScaleInfo';
import { DataLayers } from './DataLayers/DataLayers';
import { ProvincesLayer } from './ProvincesLayer/ProvincesLayer';
import { DEFAULT_ZOOM, LAT_CENTER, LON_CENTER, MIN_ZOOM, VIETNAM_BOUNDS } from '@/config/constant';
// import { Image } from '@nextui-org/react';
// import { DataLayers } from './DataLayersTest';

export const Map = () => {
  return (
    <MapContainer
      center={[LAT_CENTER, LON_CENTER]}
      className='flex-1 cursor-crosshair'
      zoom={DEFAULT_ZOOM}
      minZoom={MIN_ZOOM}
      bounds={VIETNAM_BOUNDS}
      maxBounds={VIETNAM_BOUNDS}
      maxBoundsViscosity={1.0}
      zoomControl={false}
      attributionControl={false}
      markerZoomAnimation={true}
      scrollWheelZoom={true}
    >
      <ZoomControl position='topleft' />
      <TileLayer url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'} />
      <ProvincesLayer />
      <DataLayers />
      {/* <div className='absolute top-2 right-2 z-[1000]'>
        <Image
          height={60}
          src='http://172.19.0.3:8000/wms?service=WMS&request=GetLegendGraphic&layer=imerg_e_10KM_daily&style=precipitation&version=1.3.0&format=image/png'
        />
      </div> */}
      <div className='absolute bottom-0 right-0 z-[1000]'>
        <div className='flex align-middle p-0.5 px-1 transparent-base'>
          <LocationDataInfo />
          <MapScaleInfo />
        </div>
      </div>
    </MapContainer>
  );
};

export default Map;
