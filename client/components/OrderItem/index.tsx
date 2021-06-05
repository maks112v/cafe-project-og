import styled from '@emotion/styled';

const ItemCard = styled.div((props) => ({
  // backgroundColor: color_card_background,
  padding: `25px 25px`,
  position: 'relative',
  // borderRadius: 10,
  cursor: props?.onClick && 'pointer',
  display: 'flex',
  // flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  border: `2px solid #E5E7EB`,
  h4: {
    margin: `0 0 0`,
  },
  p: {
    height: 'auto',
    fontSize: '15px',
    lineHeight: '22px',
    marginBottom: 0,
  },
}));

const ItemImage = styled.img({
  width: 100,
  height: 100,
});

export default function OrderItem({
  name,
  image = '/items/empty.svg',
  description,
  hostFavorite,
  ...rest
}) {
  return (
    <ItemCard {...rest}>
      <div style={{ maxWidth: 100, marginRight: 25 }}>
        <ItemImage src={image} />
      </div>
      <div>
        <h4>{name}</h4>
        <p>{description}</p>
      </div>
      {hostFavorite && (
        <div
          style={{
            position: 'absolute',
            padding: `6px 8px`,
            top: -15,
            right: -15,
            backgroundColor: '#2563EB',
            color: 'white',
          }}
        >
          Host Favorite
        </div>
      )}
    </ItemCard>
  );
}
