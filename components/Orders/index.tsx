import styled from '@emotion/styled';
import moment from 'moment';
import { useStore } from '../../hooks/store';
import { color_background, color_border } from '../../styles/colors';

const Wrapper = styled.div({
  display: 'grid',
  gap: 20,
});

const Card = styled.div({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: color_background,
  padding: 10,
  border: `1px solid ${color_border}`,
  borderRadius: 4,
  h5: { margin: 0 },
});

const Content = styled.div({
  margin: `0 10px`,
  flexGrow: 1,
  h3: {
    margin: 0,
  },
});

const Image = styled.img({
  width: 50,
  height: 50,
});

export default function Orders() {
  const { orders, loadingOrders }: any = useStore();

  console.log(orders, loadingOrders);
  return (
    <Wrapper>
      {orders?.length > 0 && <h1>Orders</h1>}
      {orders?.map((order) => (
        <Card>
          <Image src={order?.item?.image} />
          <Content>
            <h3>{order?.item?.name}</h3>
            <small>{moment(order?.meta?.createdAt).fromNow()}</small>
          </Content>
          <h5>Ordered</h5>
        </Card>
      ))}
    </Wrapper>
  );
}
