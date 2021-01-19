import styled from '@emotion/styled';
import { color_coffee, color_expresso, color_milk } from '../../styles/colors';

const StyledLink = styled.a({
  width: '100%',
  backgroundColor: color_expresso,
  border: 'none',
  padding: `10px 0`,
  borderRadius: 4,
  transition: '300ms',
  outline: 'none',
  cursor: 'pointer',
  color: color_milk,
  textAlign: 'center',
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: color_coffee,
    color: color_milk,
  },
});

const StyledButton = styled.button({
  width: '100%',
  backgroundColor: color_expresso,
  border: 'none',
  padding: `10px 10px`,
  borderRadius: 4,
  transition: '300ms',
  outline: 'none',
  cursor: 'pointer',
  color: color_milk,
  '&:hover': {
    backgroundColor: color_coffee,
    color: color_milk,
  },
});

export default function Button({ children, ...rest }) {
  if (rest?.href) {
    return <StyledLink {...rest}>{children}</StyledLink>;
  }

  return <StyledButton {...rest}>{children}</StyledButton>;
}
