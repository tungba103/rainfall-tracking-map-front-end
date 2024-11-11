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
import { Controller, useFormContext } from 'react-hook-form';

export type InputOptionsType = 'text' | 'date-time' | 'checkbox' | 'select' | 'file';

interface IProps {
  type: InputOptionsType;
  label: string;
  name: string;
  metadata?: any;
}

export type InputFieldOptionsProps = IProps & (InputProps | DatePickerProps | CheckboxProps | SelectProps);

export const InputFieldOptions = ({ type, label, name, metadata, ...props }: InputFieldOptionsProps) => {
  const { control } = useFormContext();

  switch (type) {
    case 'text':
      return (
        <Controller
          name={name}
          control={control}
          render={({
            field: { value, onChange: onFieldChange },
            fieldState: { error },
            formState: { disabled: formDisabled },
          }) => (
            <Input
              value={value}
              onChange={onFieldChange}
              disabled={formDisabled}
              error={error}
              {...(props as InputProps)}
              label={label}
              variant='bordered'
              className='mb-4'
            />
          )}
        />
      );
    case 'date-time':
      return (
        <Controller
          name={name}
          control={control}
          render={({
            field: { value, onChange: onFieldChange },
            // fieldState: { error },
            // formState: { disabled: formDisabled },
          }) => (
            <DatePicker
              value={value}
              onChange={onFieldChange}
              // disabled={formDisabled}
              // error={error}
              {...(props as DatePickerProps)}
              label={label}
              className='mb-4'
              hideTimeZone
              showMonthAndYearPickers
            />
          )}
        />
      );
    case 'checkbox':
      return (
        <Controller
          name={name}
          control={control}
          render={({
            field: { value, onChange: onFieldChange },
            fieldState: { error },
            formState: { disabled: formDisabled },
          }) => (
            <Checkbox
              disabled={formDisabled}
              error={error}
              {...(props as CheckboxProps)}
              className='mb-4'
              isSelected={value}
              onChange={onFieldChange}
            >
              {label}
            </Checkbox>
          )}
        />
      );
    case 'select':
      return (
        <Controller
          name={name}
          control={control}
          render={({
            field: { value, onChange: onFieldChange },
            fieldState: { error },
            formState: { disabled: formDisabled },
          }) => (
            <Select
              value={value}
              onChange={(e) => {
                console.log(e.target.value);

                onFieldChange(e.target.value);
              }}
              selectedKeys={[value]}
              disabled={formDisabled}
              {...(props as SelectProps)}
              label={label}
              className='mb-4'
              isInvalid={!!error}
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
          )}
        />
      );
    case 'file':
      return (
        <Controller
          name={name}
          control={control}
          render={({
            field: { value, onChange: onFieldChange },
            fieldState: { error },
            formState: { disabled: formDisabled },
          }) => (
            <>
              <p className='text-sm'>
                {label}
                <span className='text-red-500'> *</span>
              </p>
              <Input
                value={value}
                onChange={onFieldChange}
                error={error}
                disabled={formDisabled}
                required
                isRequired
                {...(props as InputProps)}
                type='file'
                className='mb-4'
              />
            </>
          )}
        />
      );
    default:
      return <Input {...(props as InputProps)} />;
  }
};
