import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { CustomBarChart } from './CustomBarChart';
import { GeopolygonInfo } from './GeopolygonInfo';
import { useContext } from 'react';
import { GeopolygonLevelContext } from './ProvincesLayer';

interface LocationDetailModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  featureDetail: any;
}

export const LocationDetailModal = ({ isOpen, onOpenChange, featureDetail }: LocationDetailModalProps) => {
  console.log('featureDetail:', featureDetail);
  const currentDate = new Date();

  const { geopolygonLevel } = useContext(GeopolygonLevelContext);

  let data;

  if (geopolygonLevel === 'province') {
    data = {
      provinceName: featureDetail?.properties.Name_EN,
      provinceNameVI: featureDetail?.properties.Name_VI,
      isoCode: featureDetail?.properties.ISO3166_2_,
      bbox: featureDetail?.bbox,
      geopolygonId: Number(featureDetail?.id.split('.').pop()),
    };
  } else {
    data = {
      provinceName: featureDetail?.properties.Ten_Huyen,
      provinceNameVI: featureDetail?.properties.Ten_Huyen,
      isoCode: featureDetail?.properties.Code_vung,
      bbox: featureDetail?.bbox,
      geopolygonId: Number(featureDetail?.id.split('.').pop()),
    };
  }

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
              <p className='text-3xl font-bold'>{data.provinceName}</p>
              <GeopolygonInfo
                layerName='imerg_e_10KM_daily'
                level={geopolygonLevel}
                time={currentDate.toISOString().slice(0, 10)}
                geopolygonId={data.geopolygonId}
              />
            </ModalHeader>
            <ModalBody className='max-h-[60vh] overflow-y-auto'>
              <CustomBarChart
                geopolygonId={data.geopolygonId}
                level={geopolygonLevel}
              />
            </ModalBody>
            <ModalFooter />
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
