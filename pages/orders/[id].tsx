import styled from '@emotion/styled';
import firebase from 'firebase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import Moment from 'react-moment';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import { Statuses } from '../../components/OrderedItem/statuses';
import OrderItem from '../../components/OrderItem';
import ProgressBar from '../../components/ProgressBar';
import Seo from '../../components/Seo';
import { withAuth } from '../../hooks/auth';
import { useStore } from '../../hooks/store';
import { Card } from '../../styles/Card';
import { Container } from '../../styles/Container';
import { ContentWrapper } from '../../styles/ContentWrapper';

const DonateCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: 10,
});

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
    query: { id },
  } = useRouter();

  const [data, loadingData, dataError] = useDocumentData(
    id && firebase.firestore().collection('orders').doc(id)
  );

  if (loadingData) {
    return <Loading />;
  }

  return (
    <Container>
      <Seo titles={[getDrinkbyId(data?.item?.id).name, 'Order']} />
      <h1>Order Details</h1>
      <ContentWrapper>
        <DonateCard>
          <h3>Donate</h3>
          <p>
            Your gift will help us <b>cover the evening</b> as well as{' '}
            <b>support our youth</b>.
          </p>
          <Button href='https://cash.app/$maks112v' target='_blank'>
            Cash App
          </Button>
        </DonateCard>
        <OrderItem {...getDrinkbyId(data?.item?.id)} />
        <StatusCard>
          <ProgressBar data={data} />
          <p>Name: {data?.name}</p>
          <p>Status: {Statuses[data?.status]}</p>
          {data?.special && <p>Special: {data?.special}</p>}
          <p>
            Created:{' '}
            <Moment interval={30000} fromNow>
              {data?.meta?.createdAt}
            </Moment>
          </p>
          {data?.meta?.completedAt && (
            <p>
              Completed:{' '}
              <Moment interval={30000} fromNow>
                {data?.meta?.completedAt}
              </Moment>
            </p>
          )}
        </StatusCard>
        <Link href='/'>
          <Button>Back to Menu</Button>
        </Link>
      </ContentWrapper>
    </Container>
  );
};

export default withAuth(OrderDetails);
