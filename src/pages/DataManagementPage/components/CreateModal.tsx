import { DateValue, parseDate } from '@internationalized/date';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { InputFieldOptions, InputOptionsType } from './InputFieldOptions';
import { postDataset } from '@/api/api';
import { useCreateFormConfig } from '@/hooks/useCreateFormConfig';
import { useDataConfigByUrl } from '@/hooks/useDataConfigByUrl';
import { useEffect } from 'react';

interface IFormValues {
  datasetName: string;
  description: string;
  time: DateValue;
  resolution: string;
  frequency: string;
  isAvailable: boolean;
  file: FileList;
}

export const CreateModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { name } = useDataConfigByUrl();

  const { createInputFields } = useCreateFormConfig();
  const method = useForm<IFormValues>({});

  useEffect(() => {
    method.reset({
      datasetName: name,
      time: parseDate(new Date().toISOString().split('T')[0]),
      resolution: 'four',
      frequency: 'hour',
      isAvailable: true,
    });
  }, [name]);

  // Handle form submission
  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    try {
      const { datasetName, resolution, frequency, time, file } = data;
      console.log('submit', data, file);

      await postDataset(datasetName, resolution, frequency, time, file);
    } catch (error) {
      console.log('Post dataset fail', error);
    }
  };

  return (
    <>
      <Button
        color='primary'
        onPress={onOpen}
        size='md'
      >
        Add new {name.toLowerCase()}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement='top'
        backdrop='opaque'
        classNames={{ backdrop: 'bg-background/60' }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Add new {name.toLowerCase()}</ModalHeader>
              <ModalBody>
                <FormProvider {...method}>
                  {createInputFields.map((inputField) => (
                    <InputFieldOptions
                      key={inputField.key}
                      name={inputField.createFormConfig?.name as string}
                      type={inputField.createFormConfig?.inputType as InputOptionsType}
                      label={inputField.createFormConfig?.label as string}
                      metadata={inputField.createFormConfig?.metadata}
                      isRequired={inputField.createFormConfig?.isRequired}
                      isDisabled={inputField.createFormConfig?.isDisabled}
                    />
                  ))}
                </FormProvider>
              </ModalBody>
              <ModalFooter>
                <Button
                  color='danger'
                  variant='flat'
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  type='submit'
                  color='primary'
                  onClick={method.handleSubmit(onSubmit)}
                >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
