import { CRS } from 'leaflet';
import { useEffect, useState } from 'react';
import { LayerGroup, Marker, Tooltip, useMapEvents, WMSTileLayer } from 'react-leaflet';
import geoblaze from 'geoblaze';
import parseGeoraster from 'georaster';
import L from 'leaflet';

interface CustomWMSTileLayerProps {
  date: string;
  layerName: string;
  checked: boolean;
}

export const CustomWMSTileLayer = ({ date, layerName, checked }: CustomWMSTileLayerProps) => {
  const [rainfallData, setRainfallData] = useState(null);
  const [hoverData, setHoverData] = useState(null);
  const [hoverPosition, setHoverPosition] = useState<[number, number]>();

  useEffect(() => {
    const loadRainfallData = async () => {
      const wcsUrl = `http://172.19.0.3:8000/wcs?service=WCS&request=GetCoverage&coverageId=${layerName}&version=2.0.1&format=image/geotiff&subset=time(%22${date}%22)`;
      try {
        const response = await fetch(wcsUrl);

        const arrayBuffer = await response.arrayBuffer();

        const georaster = await parseGeoraster(arrayBuffer);

        setRainfallData(georaster);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu WCS: ', error);
      }
    };

    if (date && layerName && checked) {
      loadRainfallData();
    }
  }, [date, layerName, checked]);

  useMapEvents({
    mousemove: async (event) => {
      const { lat, lng } = event.latlng;

      if (rainfallData) {
        const value = geoblaze.identify(rainfallData, [lng, lat]);
        setHoverData(value);
        setHoverPosition([lat, lng]);
      }
    },
  });

  const invisibleIcon = L.divIcon({
    html: '', // No HTML content for icon
    className: 'invisible-marker', // Optional: define your own CSS class
    iconSize: [0, 0], // Set icon size to zero
  });

  return (
    <LayerGroup key={date?.toString() + layerName}>
      <WMSTileLayer
        url={`http://172.19.0.3:8000/wms?time=${date}`}
        layers={layerName}
        format='image/png'
        transparent={true}
        opacity={0.4}
        version='1.3.0'
        tileSize={512}
        crs={CRS.EPSG4326}
      />
      {hoverPosition && hoverData && (
        <Marker
          position={hoverPosition}
          icon={invisibleIcon}
        >
          <Tooltip
            direction='top'
            opacity={1}
            permanent
          >
            {`${hoverData[0]} mm`}
          </Tooltip>
        </Marker>
      )}
    </LayerGroup>
  );
};
