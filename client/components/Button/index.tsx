import styled from '@emotion/styled';
import { color_milk } from '../../styles/colors';

const StyledLink = styled.a({
  width: '100%',
  border: 'none',
  padding: `10px 0`,
  borderRadius: 4,
  transition: '300ms',
  outline: 'none',
  cursor: 'pointer',
  color: '#111827',
  textAlign: 'center',
  textDecoration: 'none',
  '&:hover': {
    color: '#111827',
  },
});

const StyledButton = styled.button({
  width: '100%',
  backgroundColor: '#111827',
  border: '2px solid #111827',
  padding: `12px 10px`,
  // borderRadius: 4,
  transition: '300ms',
  outline: 'none',
  cursor: 'pointer',
  color: color_milk,
  '&:hover': {
    backgroundColor: 'white',
    color: '#111827',
  },
});

export default function Button({ children, ...rest }) {
  if (rest?.href) {
    return <StyledLink {...rest}>{children}</StyledLink>;
  }

  return <StyledButton {...rest}>{children}</StyledButton>;
}
