import { FunctionComponent } from 'react';

interface Props extends React.Component {
  type?: 'text' | 'select';
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

  return (
    <div>
      <label
        htmlFor='email'
        className='block text-sm font-medium text-gray-700'
      >
        {label}
      </label>
      <div className='mt-1'>
        <input
          className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-secondary focus:border-secondary sm:text-sm'
          {...field}
          {...props}
        />
        {touched[field.name] && errors[field.name] && (
          <small className='text-danger'>{errors[field.name]}</small>
        )}
      </div>
    </div>
  );
};

export default Input;
