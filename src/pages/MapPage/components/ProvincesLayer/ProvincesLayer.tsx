import { useEffect, useState } from 'react';
import { GeoJSON, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import { DEFAULT_ZOOM } from '@/config/constant';
import { useDisclosure } from '@nextui-org/react';
import { LocationDetailModal } from './LocationDetailModal';

const MIN_ZOOM_SIZE_DISTRICT_LEVEL = 9;

export const ProvincesLayer = () => {
  const [features, setFeatures] = useState(null);
  const [highlightedFeatureId, setHighlightedFeatureId] = useState(null);

  const [featureDetail, setFeatureDetail] = useState(null);

  const fetchAllFeatures = async (zoom: number) => {
    let url = '';
    if (zoom < MIN_ZOOM_SIZE_DISTRICT_LEVEL) {
      url = `http://localhost:8080/geoserver/Test/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Test%3Avietnam-provinces-iso&maxFeatures=600&outputFormat=application%2Fjson`;
    } else {
      url = `http://localhost:8080/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=Test:Dia_phan_Huyen&outputFormat=application/json`;
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
    <>
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
    </>
  );
};
