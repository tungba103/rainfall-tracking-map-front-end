import {
  Checkbox,
  Input,
  InputProps,
  CheckboxProps,
  DatePicker,
  DatePickerProps,
  Select,
  SelectItem,
  SelectProps,
} from '@nextui-org/react';

export type InputOptionsType = 'text' | 'date-time' | 'checkbox' | 'select' | 'file';

interface IProps {
  type: InputOptionsType;
  label: string;
  metadata?: any;
}

export type InputFieldOptionsProps = IProps & (InputProps | DatePickerProps | CheckboxProps | SelectProps);

export const InputFieldOptions = ({ type, label, name, metadata, ...props }: InputFieldOptionsProps) => {
  switch (type) {
    case 'text':
      return (
        <Input
          {...(props as InputProps)}
          label={label}
          variant='bordered'
          className='mb-4'
        />
      );
    case 'date-time':
      return (
        <DatePicker
          {...(props as DatePickerProps)}
          label={label}
          className='mb-4'
          hideTimeZone
          showMonthAndYearPickers
        />
      );
    case 'checkbox':
      return (
        <Checkbox
          {...(props as CheckboxProps)}
          className='mb-4'
          isSelected
        >
          {label}
        </Checkbox>
      );
    case 'select':
      return (
        <Select
          {...(props as SelectProps)}
          label={label}
          className='mb-4'
          isInvalid
          errorMessage={`Please select a ${name}`}
        >
          {metadata?.options?.map((option: any) => (
            <SelectItem
              key={option.key}
              value={option.key}
            >
              {option.value}
            </SelectItem>
          ))}
        </Select>
      );
    case 'file':
      return (
        <>
          <p className='text-sm'>{label}</p>
          <Input
            {...(props as InputProps)}
            type='file'
            className='mb-4'
          />
        </>
      );

    default:
      return <Input {...(props as InputProps)} />;
  }
};
