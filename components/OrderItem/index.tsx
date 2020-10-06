import styled from '@emotion/styled';
import { color_border, color_card_background } from '../../styles/colors';

const ItemCard = styled.div((props) => ({
  backgroundColor: color_card_background,
  padding: `30px 20px`,
  borderRadius: 10,
  cursor: props?.onClick && 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${color_border}`,
  h4: {
    margin: `20px 0 0`,
  },
}));

const ItemImage = styled.img({
  width: 100,
  height: 100,
});

export default function OrderItem({
  name,
  image = '/items/empty.svg',
  ...rest
}) {
  return (
    <ItemCard {...rest}>
      <ItemImage src={image} />
      <h4>{name}</h4>
    </ItemCard>
  );
}
