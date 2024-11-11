import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { CustomBarChart } from './CustomBarChart';

interface LocationDetailModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  featureDetail: any;
}

const rainfallData = [
  { date: '2024-10-01', totalRainfall: 20, averageRainfall: 10 },
  { date: '2024-10-02', totalRainfall: 30, averageRainfall: 15 },
  { date: '2024-10-03', totalRainfall: 16, averageRainfall: 8 },
  { date: '2024-10-04', totalRainfall: 24, averageRainfall: 12 },
  { date: '2024-10-05', totalRainfall: 14, averageRainfall: 7 },
  { date: '2024-10-06', totalRainfall: 10, averageRainfall: 5 },
  { date: '2024-10-07', totalRainfall: 36, averageRainfall: 18 },
  { date: '2024-10-08', totalRainfall: 40, averageRainfall: 20 },
  { date: '2024-10-09', totalRainfall: 28, averageRainfall: 14 },
  { date: '2024-10-10', totalRainfall: 32, averageRainfall: 16 },
  { date: '2024-10-11', totalRainfall: 20, averageRainfall: 10 },
  { date: '2024-10-12', totalRainfall: 24, averageRainfall: 12 },
  { date: '2024-10-13', totalRainfall: 12, averageRainfall: 6 },
  { date: '2024-10-14', totalRainfall: 16, averageRainfall: 8 },
  { date: '2024-10-15', totalRainfall: 30, averageRainfall: 15 },
  { date: '2024-10-16', totalRainfall: 18, averageRainfall: 9 },
  { date: '2024-10-17', totalRainfall: 14, averageRainfall: 7 },
  { date: '2024-10-18', totalRainfall: 28, averageRainfall: 14 },
  { date: '2024-10-19', totalRainfall: 22, averageRainfall: 11 },
  { date: '2024-10-20', totalRainfall: 20, averageRainfall: 10 },
  { date: '2024-10-21', totalRainfall: 26, averageRainfall: 13 },
  { date: '2024-10-22', totalRainfall: 32, averageRainfall: 16 },
  { date: '2024-10-23', totalRainfall: 24, averageRainfall: 12 },
  { date: '2024-10-24', totalRainfall: 18, averageRainfall: 9 },
  { date: '2024-10-25', totalRainfall: 20, averageRainfall: 10 },
  { date: '2024-10-26', totalRainfall: 22, averageRainfall: 11 },
  { date: '2024-10-27', totalRainfall: 16, averageRainfall: 8 },
  { date: '2024-10-28', totalRainfall: 28, averageRainfall: 14 },
  { date: '2024-10-29', totalRainfall: 36, averageRainfall: 18 },
  { date: '2024-10-30', totalRainfall: 40, averageRainfall: 20 },
  { date: '2024-10-31', totalRainfall: 34, averageRainfall: 17 },
];

export const LocationDetailModal = ({ isOpen, onOpenChange, featureDetail }: LocationDetailModalProps) => {
  console.log('featureDetail:', featureDetail);

  const data = {
    provinceName: featureDetail?.properties.Name_EN,
    provinceNameVI: featureDetail?.properties.Name_VI,
    isoCode: featureDetail?.properties.ISO3166_2_,
    bbox: featureDetail?.bbox,
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        backdrop: 'z-0',
        wrapper: 'z-[1000] h-screen overflow-y-hidden',
      }}
      size='5xl'
      scrollBehavior='inside'
      placement='top'
    >
      <ModalContent className=''>
        {() => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              <p className='text-2xl font-bold'>{data.provinceName}</p>
              <div className='ms-12 font-normal'>
                <p>
                  <strong className='font-semibold'>Current rainfall:</strong> 23mm
                </p>
                <p>
                  <strong className='font-semibold'>Total rainfall in this month:</strong> 23mm
                </p>
                <p>
                  <strong className='font-semibold'>Average rainfall in this month:</strong> 23mm
                </p>
              </div>
            </ModalHeader>
            <ModalBody className='max-h-[60vh] overflow-y-auto'>
              <CustomBarChart
                titleName='Total Rainfall'
                color={'#2184d8'}
                granularity={{ day: true, week: true, month: true, quarter: true, year: true }}
                data={rainfallData.map((each) => ({
                  value: each.totalRainfall,
                  key: each.date,
                }))}
              />
              <CustomBarChart
                titleName='Average Rainfall'
                color={'#8884d8'}
                granularity={{ day: false, week: true, month: true, quarter: true, year: true }}
                data={rainfallData.map((each) => ({
                  value: each.averageRainfall,
                  key: each.date,
                }))}
              />
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
