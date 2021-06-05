import styled from '@emotion/styled';
import firebase from 'firebase';
import Link from 'next/link';
import { useState } from 'react';
import Moment from 'react-moment';
import { useSession } from '../../hooks/auth';
import { useStore } from '../../hooks/store';
import { color_border } from '../../styles/colors';
import { ContentWrapper } from '../../styles/ContentWrapper';
import Button from '../Button';
import { Statuses } from '../OrderedItem/statuses';

const Card = styled.div({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'white',
  padding: 20,
  border: `1px solid ${color_border}`,
  cursor: 'pointer',
  // borderRadius: 4,
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

const CenterLink = styled.div({
  width: '100%',
  textAlign: 'center',
  cursor: 'pointer',
});

export default function Orders() {
  const { auth }: any = useSession();
  const { orders, loadingOrders, getTeaFlavorbyId }: any = useStore();
  const [hideUpdate, setHideUpdate] = useState(false);

  return (
    <ContentWrapper>
      {orders?.length > 0 && (
        <TitleWrapper>
          <h1>Recent Orders</h1>
          {/* <Avatar src={auth?.providerData?.[0]?.photoURL} /> */}
        </TitleWrapper>
      )}
      {orders?.slice(0, 2)?.map((order) => (
        <Link key={order?.id} href='/orders/[id]' as={`/orders/${order?.id}`}>
          <Card>
            <Image src={order?.item?.image} />
            <Content>
              <h3 style={{ marginBottom: 4 }}>
                {order?.item?.name}{' '}
                {order?.details?.teaId &&
                  `- (${
                    getTeaFlavorbyId(order?.details?.teaId)?.name || 'Any'
                  })`}
              </h3>
              <Moment interval={30000} fromNow>
                {order?.meta?.createdAt}
              </Moment>
            </Content>
            <h5>{Statuses[order?.status]}</h5>
          </Card>
        </Link>
      ))}
      {orders?.length > 1 && (
        <CenterLink>
          <Link href='/orders'>
            <a>View All</a>
          </Link>
        </CenterLink>
      )}
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
    </ContentWrapper>
  );
}
