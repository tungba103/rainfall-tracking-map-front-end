import { dataManagementNavItems } from '@/config/data-management.config';
import { createContext, useState } from 'react';
import { LayersControl, useMapEvents } from 'react-leaflet';
import { CustomSlider } from './CustomSlider';
import { CustomWMSTileLayer } from './CustomWMSTileLayer';
import { CalendarDate } from '@internationalized/date';

export const SliderContext = createContext<{
  date: CalendarDate;
  setDate: React.Dispatch<React.SetStateAction<CalendarDate>>;
} | null>(null);

export const DataLayers = () => {
  const listLayers = dataManagementNavItems.subItems;

  const [date, setDate] = useState(new CalendarDate(2024, 9, 1));

  const [layerStatus, setLayerStatus] = useState<Record<string, boolean>>(() => {
    const savedStatus = localStorage.getItem('layerStatus');
    return savedStatus ? JSON.parse(savedStatus) : {};
  });

  useMapEvents({
    overlayadd: (e) => {
      setLayerStatus(() => ({
        [e.name]: true,
      }));

      localStorage.setItem(
        'layerStatus',
        JSON.stringify({
          [e.name]: true,
        })
      );
    },
  });

  const dateParam = date ? date.toString() : '';

  return (
    <SliderContext.Provider value={{ date, setDate }}>
      <LayersControl position='topleft'>
        {listLayers?.map((layer) => (
          <LayersControl.Overlay
            name={layer.name}
            checked={!!layerStatus[layer.name]}
          >
            <CustomWMSTileLayer
              date={dateParam}
              layerName={layer.layer ?? ''}
              checked={!!layerStatus[layer.name]}
            />
          </LayersControl.Overlay>
        ))}
      </LayersControl>
      <div className='absolute bottom-0 left-0 w-full z-[1000]'>
        <CustomSlider />
      </div>
    </SliderContext.Provider>
  );
};
