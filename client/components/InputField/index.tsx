import styled from '@emotion/styled';
import { ErrorMessage, Field, useFormikContext } from 'formik';
import InputMask from 'react-input-mask';
import {
  color_background,
  color_coffee,
  color_expresso,
} from '../../styles/colors';

const InputWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const StyledField = styled(Field)({
  backgroundColor: 'white',
  padding: 12,
  outline: 'none',
  border: `2px solid #D1D5DB`,
  color: '#111827',
  '&:focus': {
    borderColor: '#4B5563',
  },
  '&::placeholder': {
    color: '#6B7280',
  },
});

const StyledMask = styled(InputMask)({
  backgroundColor: color_background,
  padding: 10,
  outline: 'none',
  border: `1px solid ${color_expresso}`,
  borderRadius: 4,
  color: color_coffee,
  '&:focus': {
    borderColor: color_coffee,
  },
  '&::placeholder': {
    color: color_expresso,
  },
});

const StyledErrorMessage = styled.span({
  paddingTop: 5,
  margin: 0,
  fontSize: 14,
  color: '#F87171',
  fontWeight: 500,
});

export default function InputField({ ...rest }) {
  return (
    <InputWrapper>
      <StyledField {...rest} />
      <StyledErrorMessage className='sm'>
        <ErrorMessage name={rest?.name} />
      </StyledErrorMessage>
    </InputWrapper>
  );
}

export function InputMasked({ ...rest }) {
  const formik = useFormikContext();
  return (
    <InputWrapper {...rest}>
      <StyledMask
        value={formik?.values[rest.name]}
        onChange={(e) => {
          const target = e.target;
          const value = target.value.replace(/[^0-9]/gi, '');
          formik.setFieldValue(rest?.name, value);
        }}
        mask='(999) 999-9999'
        {...rest}
      />
      <StyledErrorMessage>
        <ErrorMessage name={rest?.name} />
      </StyledErrorMessage>
    </InputWrapper>
  );
}
