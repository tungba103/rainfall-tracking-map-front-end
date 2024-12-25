import { Slider } from '@nextui-org/slider';
import { useContext, useState } from 'react';
import TimeAxis from './TimeAxis';
import { SliderContext } from './DataLayers';
import { DateRangePicker } from '@nextui-org/date-picker';
import { RangeValue } from '@react-types/shared';
import { CalendarDate } from '@internationalized/date';

export const CustomSlider = () => {
  const { date, setDate } = useContext(SliderContext) || { date: new CalendarDate(2024, 4, 1), setDate: () => {} };
  console.log('CustomSlider', date.toString());

  const [value, setValue] = useState<RangeValue<CalendarDate>>({
    start: new CalendarDate(2024, 10, 1),
    end: new CalendarDate(2024, 11, 1),
  });

  const calculateDaysBetween = (start: CalendarDate, end: CalendarDate) => {
    let days = 0;
    let currentDate = start;
    while (currentDate.compare(end) < 0) {
      currentDate = currentDate.add({ days: 1 });
      days++;
    }
    return days;
  };

  const totalSteps = calculateDaysBetween(value.start as CalendarDate, value.end as CalendarDate) + 1;

  const calculateDateFromStep = (step: number) => {
    return value.start.add({ days: step - 1 });
  };

  const currentStep = calculateDaysBetween(value.start, date) + 1;

  console.log('totalSteps', currentStep, totalSteps);

  return (
    <div className='flex justify-center align-middle mb-8'>
      <div className='flex justify-start align-middle p-1.5 pb-0 gap-2 rounded-md transparent-base w-full mx-4'>
        <DateRangePicker
          className='max-w-60'
          variant='faded'
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
            setDate(nextValue.start);
          }}
        />
        <div className='flex-1'>
          <Slider
            id='custom-slider'
            size='sm'
            step={1}
            maxValue={totalSteps}
            minValue={1}
            value={currentStep}
            onChange={(step) => {
              if (typeof step === 'number') {
                setDate(calculateDateFromStep(step));
              }
            }}
            className='pb-0.5 rounded-lg'
            classNames={{
              thumb: 'w-4 h-4',
            }}
          />
          <TimeAxis
            startDate={value.start}
            endDate={value.end}
          />
        </div>
      </div>
    </div>
  );
};
