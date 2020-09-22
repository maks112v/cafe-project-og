import styled from '@emotion/styled';
import firebase from 'firebase';
import moment from 'moment';
import { useState } from 'react';
import { useSession } from '../../hooks/auth';
import { useStore } from '../../hooks/store';
import { color_background, color_border } from '../../styles/colors';
import Button from '../Button';

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

const TitleWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  margin: `50px 0 20px`,
  h1: {
    margin: 0,
    flexGrow: 1,
  },
});

const Avatar = styled.img({
  width: 50,
  height: 50,
  borderRadius: 100,
});

export default function Orders() {
  const { auth }: any = useSession();
  const { orders, loadingOrders }: any = useStore();
  const [hideUpdate, setHideUpdate] = useState(false);

  return (
    <Wrapper>
      {orders?.length > 0 && (
        <TitleWrapper>
          <h1>Orders</h1>
          <Avatar src={auth?.providerData?.[0]?.photoURL} />
        </TitleWrapper>
      )}
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
      {orders?.length > 1 &&
      auth &&
      !auth?.providerData?.[0]?.providerId &&
      !hideUpdate ? (
        <Button
          onClick={() => {
            firebase
              .auth()
              .currentUser.linkWithPopup(new firebase.auth.GoogleAuthProvider())
              .then((res) => {
                setHideUpdate(true);
              });
          }}
        >
          Claim your Account
        </Button>
      ) : null}
    </Wrapper>
  );
}
