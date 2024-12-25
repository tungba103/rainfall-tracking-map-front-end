import { useEffect, useState } from 'react';
import { GeoJSON, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import { DEFAULT_ZOOM, GeopolygonLevelTypes, MIN_ZOOM_SIZE_DISTRICT_LEVEL } from '@/config/constant';
import { useDisclosure } from '@nextui-org/react';
import { LocationDetailModal } from './LocationDetailModal';

import { createContext } from 'react';

interface GeopolygonLevelContextProps {
  geopolygonLevel: GeopolygonLevelTypes;
  setGeopolygonLevel: React.Dispatch<React.SetStateAction<GeopolygonLevelTypes>>;
}

export const GeopolygonLevelContext = createContext<GeopolygonLevelContextProps>({
  geopolygonLevel: 'province',
  setGeopolygonLevel: () => {},
});

export const ProvincesLayer = () => {
  const [features, setFeatures] = useState(null);
  const [highlightedFeatureId, setHighlightedFeatureId] = useState(null);

  const [featureDetail, setFeatureDetail] = useState(null);
  const [geopolygonLevel, setGeopolygonLevel] = useState<GeopolygonLevelTypes>('province');

  const fetchAllFeatures = async (zoom: number) => {
    let url = '';

    if (zoom < MIN_ZOOM_SIZE_DISTRICT_LEVEL) {
      url = `http://localhost:8080/geoserver/vietnam/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=vietnam%3Avietnam-provinces-iso&maxFeatures=538&outputFormat=application%2Fjson`;
      setGeopolygonLevel('province');
    } else {
      url = `http://localhost:8080/geoserver/vietnam/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=vietnam%3Avietnam-districts-iso&maxFeatures=1561&outputFormat=application%2Fjson`;
      setGeopolygonLevel('district');
    }

    try {
      const response = await axios.get(url);

      setFeatures(null);
      setTimeout(() => setFeatures(response.data.features), 0);
    } catch (error) {
      console.error('Error fetching features:', error);
    }
  };

  useEffect(() => {
    fetchAllFeatures(DEFAULT_ZOOM);
  }, []);

  const defaultStyle = {
    color: 'transparent',
    weight: 0,
    fillOpacity: 0,
  };

  const highlightStyle = {
    color: 'blue',
    weight: 2,
  };

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      mouseover: () => setHighlightedFeatureId(feature.id),
      mouseout: () => setHighlightedFeatureId(null),
      click: () => {
        setFeatureDetail(feature);
        onOpen();
      },
    });
  };

  useMapEvents({
    zoomend: (e) => {
      fetchAllFeatures(e.target.getZoom());
    },
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <GeopolygonLevelContext.Provider value={{ geopolygonLevel, setGeopolygonLevel }}>
      {features && (
        <GeoJSON
          data={features}
          style={(feature) => (feature?.id === highlightedFeatureId ? highlightStyle : defaultStyle)}
          onEachFeature={onEachFeature}
        />
      )}
      <LocationDetailModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        featureDetail={featureDetail}
      />
    </GeopolygonLevelContext.Provider>
  );
};
