import { useFormikContext } from 'formik';
import React, { FunctionComponent } from 'react';
import { classnames } from 'tailwindcss-classnames';
import { AllIcons } from '../../data/Icons';

interface IconSelectProps {
  label?: string;
  name: string;
}

const IconSelect: FunctionComponent<IconSelectProps> = ({
  label,
  name,
  children,
}) => {
  const formik = useFormikContext();

  return (
    <div>
      <label
        htmlFor='email'
        className='flex-grow block text-sm font-medium text-gray-700'
      >
        {label}
      </label>
      <div className='grid grid-cols-3 gap-5'>
        {AllIcons.map((item) => (
          <div
            onClick={() => {
              formik.setFieldValue(name, item?.slug);
            }}
            className={classnames(
              'flex',
              'items-center',
              'justify-center',
              'p-5',
              'border-2',
              'rounded',
              'select-none',
              {
                ['border-secondary']: formik.values[name] === item?.slug,
                ['bg-gray-50']: formik.values[name] === item?.slug,
              }
            )}
          >
            <img src={item?.src} style={{ maxWidth: 50, maxHeight: 50 }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconSelect;
