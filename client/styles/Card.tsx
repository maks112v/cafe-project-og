import styled from '@emotion/styled';
import { color_background, color_border } from './colors';

export const Card = styled.div({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: color_background,
  padding: 20,
  border: `1px solid ${color_border}`,
  cursor: 'pointer',
  borderRadius: 4,
  h3: { margin: 0 },
  p: { margin: 0 },
  h5: { margin: 0 },
});
