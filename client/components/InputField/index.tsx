import styled from '@emotion/styled';
import { Field } from 'formik';
import {
  color_background,
  color_coffee,
  color_expresso,
} from '../../styles/colors';

const StyledField = styled(Field)({
  backgroundColor: color_background,
  width: '100%',
  padding: 10,
  outline: 'none',
  border: `1px solid ${color_expresso}`,
  borderRadius: 4,
  '&:focus': {
    borderColor: color_coffee,
  },
});

export default function InputField({ ...rest }) {
  return (
    <>
      <StyledField {...rest} />
    </>
  );
}
