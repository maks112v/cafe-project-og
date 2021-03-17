import { Field } from 'formik';
import React, { FunctionComponent } from 'react';
import Input from './Input';

interface ItemInputResolverProps {
  type: string;
}

const ItemInputResolver: FunctionComponent<ItemInputResolverProps> = ({
  type,
  children,
}) => {
  if (type === 'syrups') {
    return (
      <Field name='syrups' label='Syrup' component={Input} type='select'>
        <option value=''>None</option>
        <option value='caramel'>Caramel</option>
        <option value='chocolate'>Chocolate</option>
      </Field>
    );
  }

  return <></>;
};

export default ItemInputResolver;
