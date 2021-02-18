import { FunctionComponent } from 'react';

interface Props extends React.Component {
  type?: 'text' | 'select' | 'textarea';
  label?: string;
  field: any;
  form: any;
}

const Input: FunctionComponent<Props> = ({
  type,
  label,
  children,
  field,
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  if (type === 'select') {
    return (
      <div>
        <label
          htmlFor='location'
          className='block text-sm font-medium text-gray-700'
        >
          Location
        </label>
        <select
          id='location'
          name='location'
          className='block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm'
          {...field}
          {...props}
        >
          {children}
        </select>
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div>
        <div className='flex items-center'>
          <label
            htmlFor='email'
            className='flex-grow block text-sm font-medium text-gray-700'
          >
            {label}
          </label>
          {touched[field.name] && errors[field.name] && (
            <small className='text-xs text-red-500'>{errors[field.name]}</small>
          )}
        </div>
        <div className='mt-1'>
          <textarea
            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-secondary focus:border-secondary sm:text-sm'
            rows={5}
            {...field}
            {...props}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='flex items-center'>
        <label
          htmlFor='email'
          className='flex-grow block text-sm font-medium text-gray-700'
        >
          {label}
        </label>
        {touched[field.name] && errors[field.name] && (
          <small className='text-xs text-red-500'>{errors[field.name]}</small>
        )}
      </div>
      <div className='mt-1'>
        <input
          className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-secondary focus:border-secondary sm:text-sm'
          {...field}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
