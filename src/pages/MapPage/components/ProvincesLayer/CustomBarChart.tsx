import { GeopolygonLevelTypes, GranularityTypes } from '@/config/constant';
import { SingleBarChart } from '@/components/SingleBarChart';
import { useEffect, useState } from 'react';
import { getRainfallByGranularity } from '@/api/odc-api';

interface CustomBarChartProps {
  level: GeopolygonLevelTypes;
  geopolygonId: number;
}

export const CustomBarChart = ({ level, geopolygonId }: CustomBarChartProps) => {
  const [granularity, setGranularity] = useState<GranularityTypes>('day');

  const [chartData, setChartData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endDate = new Date();
        const startDate = new Date('2024-01-01');
        // const startDate = new Date();
        // startDate.setMonth(startDate.getMonth() - 6);

        const response = await getRainfallByGranularity({
          layerName: 'imerg_e_10KM_daily',
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          level,
          geopolygonId,
          granularity,
          outputCrs: 'EPSG:4326',
          resolutionX: 0.1,
          resolutionY: 0.1,
        });
        setChartData(response?.rainfall_data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, [granularity, level, geopolygonId, granularity]);

  return (
    <SingleBarChart
      granularity={granularity}
      setGranularity={setGranularity}
      titleName='Total Rainfall'
      color={'#2184d8'}
      data={chartData ?? []}
      xKey='time'
      yKey='Precipitation'
    />
  );
};
