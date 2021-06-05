import Button from '@components/Button';
import Loading from '@components/Loading';
import { Statuses } from '@components/OrderedItem/statuses';
import OrderItem from '@components/OrderItem';
import ProgressBar from '@components/ProgressBar';
import Seo from '@components/Seo';
import styled from '@emotion/styled';
import { withAuth } from '@hooks/auth';
import { useStore } from '@hooks/store';
import { Card } from '@styles/Card';
import { Container } from '@styles/Container';
import { ContentWrapper } from '@styles/ContentWrapper';
import firebase from 'firebase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import Moment from 'react-moment';

const StatusCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  flexGrow: 1,
  gap: 10,
});

const OrderDetails: FunctionComponent = () => {
  const { getDrinkbyId }: any = useStore();
  const {
    push,
    query: { id },
  } = useRouter();

  const [data, loadingData, dataError]: [any, boolean, any] = useDocumentData(
    id && firebase.firestore().collection('orders').doc(id)
  );

  console.log(dataError, data);

  if (loadingData) {
    return <Loading />;
  }

  if (!loadingData && (dataError || !data)) {
    push('/');
    return null;
  }

  // if (!data?.donate) {
  //   return <DonateModal id={id} />;
  // }

  return (
    <Container>
      <Seo titles={[getDrinkbyId(data?.item?.id)?.name, 'Order']} />
      <h1>Order Details</h1>
      <ContentWrapper>
        <OrderItem {...getDrinkbyId(data?.item?.id)} />
        <StatusCard>
          <ProgressBar data={data} />
          <h3>{Statuses[data?.status]}</h3>
          <p> {data?.name}</p>
          {data?.special && <p>Special: {data?.special}</p>}
          {data?.meta?.completedAt && (
            <p>
              Complete{' '}
              <Moment interval={30000} fromNow>
                {data?.meta?.completedAt}
              </Moment>
            </p>
          )}
          <p>
            Ordered{' '}
            <Moment interval={30000} fromNow>
              {data?.meta?.createdAt}
            </Moment>
          </p>
        </StatusCard>
        <Link href='/'>
          <Button>Back to Menu</Button>
        </Link>
      </ContentWrapper>
    </Container>
  );
};

export default withAuth(OrderDetails);
