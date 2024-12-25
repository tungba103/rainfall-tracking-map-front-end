import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Tabs, Tab } from '@nextui-org/react';
import { GranularityTypes } from '@/config/constant';

interface IProps {
  data: {
    key: string;
    value: number;
  }[];
  xKey: string;
  yKey: string;
  granularity: GranularityTypes;
  setGranularity: (granularity: GranularityTypes) => void;
  titleName?: string;
  color?: string;
}

export const SingleBarChart = ({
  titleName = 'Title',
  color = '#2184d8',
  granularity,
  setGranularity,
  data,
  xKey,
  yKey,
}: IProps) => {
  return (
    <div className='mb-4'>
      <p className='ms-12 text-xl font-bold'>{titleName}</p>
      <div className='flex justify-end align-middle mb-2'>
        <Tabs
          className=''
          aria-label='granularity'
          selectedKey={granularity}
          onSelectionChange={(key) => setGranularity(key as GranularityTypes)}
        >
          {[
            'day',
            // 'week',
            'month',
            'quarter',
            'year',
          ].map((key) => (
            <Tab
              key={key}
              title={key.charAt(0).toUpperCase() + key.slice(1)}
            />
          ))}
        </Tabs>
      </div>
      <ResponsiveContainer
        // width='100%'
        // height='100%'
        minHeight={200}
        minWidth={200}
        height={400}
      >
        <BarChart
          width={150}
          height={40}
          data={data}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey={yKey}
            fill={color}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
