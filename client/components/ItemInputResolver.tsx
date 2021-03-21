import { Field, useFormikContext } from 'formik';
import React, { FunctionComponent } from 'react';
import Input from './Input';

export const AllInputs = [
  {
    label: 'Size',
    value: 'size',
  },
  {
    label: 'Syrup',
    value: 'syrups',
  },
  {
    label: 'Tea Flavors',
    value: 'teaFlavors',
  },
  {
    label: 'Ice Cream',
    value: 'Ice Cream Flavors',
  },
];

interface ItemInputResolverProps {
  type: string;
}

const ItemInputResolver: FunctionComponent<ItemInputResolverProps> = ({
  type,
  children,
}) => {
  const formik = useFormikContext();
  if (type === 'size') {
    return (
      <Field name='size' label='Size' component={Input} type='select'>
        <option value='small'>Small</option>
        <option value='medium'>Medium</option>
        <option value='large'>Large</option>
      </Field>
    );
  }

  if (type === 'syrups') {
    return (
      <>
        <Field name='syrups' label='Syrup' component={Input} type='select'>
          <option value=''>None</option>
          <option value='caramel'>Caramel</option>
          <option value='chocolate'>Chocolate</option>
        </Field>
        {formik?.values?.syrups !== '' && (
          <Field
            name='syrupPumps'
            label='Syrup Pumps'
            component={Input}
            type='select'
          >
            <option value='light'>Light</option>
            <option value='regular'>Regular</option>
            <option value='extra'>Extra</option>
          </Field>
        )}
      </>
    );
  }

  if (type === 'teaFlavor') {
    return (
      <>
        <Field name='syrups' label='Syrup' component={Input} type='select'>
          <option value=''>None</option>
          <option value='caramel'>Caramel</option>
          <option value='chocolate'>Chocolate</option>
        </Field>
      </>
    );
  }

  return <></>;
};

export default ItemInputResolver;
