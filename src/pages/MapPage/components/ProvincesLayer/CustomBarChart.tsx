import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Tabs, Tab } from '@nextui-org/react';

interface CustomBarChartProps {
  titleName: string;
  color: string;
  granularity: {
    day: boolean;
    week: boolean;
    month: boolean;
    quarter: boolean;
    year: boolean;
  };
  data: {
    key: string;
    value: number;
  }[];
}

export const CustomBarChart = ({
  titleName = 'Title',
  color,
  granularity = {
    day: false,
    week: false,
    month: false,
    quarter: false,
    year: false,
  },
  data,
}: CustomBarChartProps) => {
  return (
    <div className='mb-4'>
      <div className='flex justify-between align-middle mb-2'>
        <p className='ms-12 text-xl font-bold'>{titleName}</p>
        <Tabs
          className=''
          aria-label='granularity'
        >
          {Object.keys(granularity).map(
            (key) =>
              granularity[key as keyof typeof granularity] && (
                <Tab
                  key={key}
                  title={key.charAt(0).toUpperCase() + key.slice(1)}
                />
              )
          )}
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
          <XAxis dataKey='key' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey='value'
            fill={color}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
