import styled from '@emotion/styled';
import { ErrorMessage, Field } from 'formik';
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

const StyledErrorMessage = styled.p({
  paddingTop: 5,
  margin: 0,
  color: color_expresso,
  fontWeight: 'lighter',
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
