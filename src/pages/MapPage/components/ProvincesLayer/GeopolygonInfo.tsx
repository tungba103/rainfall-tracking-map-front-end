import { getRainfallDetail } from '@/api/odc-api';
import { GeopolygonLevelTypes, LayerNameTypes } from '@/config/constant';
import { useEffect, useState } from 'react';

interface IProps {
  layerName: LayerNameTypes;
  level: GeopolygonLevelTypes;
  time: string;
  geopolygonId: number;
}

export const GeopolygonInfo = ({ layerName, level, time, geopolygonId }: IProps) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRainfallDetail({
          layerName,
          level,
          time,
          geopolygonId,
          outputCrs: 'EPSG:4326',
          resolutionX: 0.1,
          resolutionY: 0.1,
        });
        setData(response);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='ms-12 font-normal text-base mt-2'>
      <p className='mb-1'>
        <strong className='font-semibold'>Current rainfall today:</strong>{' '}
        <span className='bg-blue-300 px-1 py-0.5 rounded-lg'>{data?.current_rainfall?.toFixed(0) ?? '--'} mm</span>
      </p>
      <p className='mb-1'>
        <strong className='font-semibold'>Highest recorded rainfall in this month: </strong>{' '}
        <span className='bg-red-300 px-1 py-0.5 rounded-lg'>
          {data?.highest_recorded_rainfall?.toFixed(0) ?? '--'} mm
        </span>
      </p>
      <p className='mb-1'>
        <strong className='font-semibold'>Lowest recorded rainfall in this month: </strong>{' '}
        <span className='bg-blue-100 px-1 py-0.5 rounded-lg'>
          {data?.lowest_recorded_rainfall?.toFixed(0) ?? '--'} mm
        </span>
      </p>
      <p className='mb-1'>
        <strong className='font-semibold'>Total rainfall for the month:</strong>{' '}
        <span className='bg-blue-400 px-1 py-0.5 rounded-lg'>
          {data?.total_rainfall_for_the_month?.toFixed(0) ?? '--'} mm
        </span>
      </p>
      <p className='mb-1'>
        <strong className='font-semibold'>Month average rainfall:</strong>{' '}
        <span className='bg-blue-400 px-1 py-0.5 rounded-lg'>
          {data?.month_average_rainfall?.toFixed(0) ?? '--'} mm
        </span>
      </p>
    </div>
  );
};
