import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { CalendarDate } from '@nextui-org/react';
import { getLocalTimeZone } from '@internationalized/date';

interface TimeAxisProps {
  startDate: CalendarDate;
  endDate: CalendarDate;
}

const TimeAxis: React.FC<TimeAxisProps> = ({ startDate, endDate }) => {
  const axisRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    if (axisRef.current) {
      const width = document.getElementById('custom-slider')?.offsetWidth ?? 0;

      const x = d3
        .scaleTime()
        .domain([startDate.toDate(getLocalTimeZone()), endDate.toDate(getLocalTimeZone())])
        .range([0, width]);

      const axis = d3.axisBottom(x);

      d3.select(axisRef.current).call(axis).selectAll('text').style('font-size', '14px');
    }
  }, [startDate, endDate]);

  return (
    <svg
      width='100%'
      height={32}
    >
      <g ref={axisRef} />
    </svg>
  );
};

export default TimeAxis;
