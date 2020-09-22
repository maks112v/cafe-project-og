import styled from '@emotion/styled';
import firebase from 'firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Loading from '../../components/Loading';
import OrderedItem from '../../components/OrderedItem';
import Seo from '../../components/Seo';
import { withAdmin } from '../../hooks/auth';
import { color_background, color_border } from '../../styles/colors';
import { Container } from '../../styles/Container';

const CardWrapper = styled.div({
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

function AdminIndex() {
  const [allOrders, loadingOrders] = useCollectionData(
    firebase
      .firestore()
      .collection(`orders`)
      .where('status', '!=', 'complete')
      .orderBy('status', 'asc')
      .orderBy('meta.createdAt', 'asc'),
    {
      idField: 'id',
    }
  );

  const [completeOrders, loadingCompleteOrders, error] = useCollectionData(
    firebase
      .firestore()
      .collection(`orders`)
      .where('status', '==', 'complete')
      .orderBy('meta.createdAt', 'desc')
      .limit(20),
    {
      idField: 'id',
    }
  );
  console.log(allOrders, loadingOrders, error);

  return (
    <>
      <Seo titles={['Orders', 'Admin']} />
      <Container>
        <h3>Order Queue</h3>
        <CardWrapper>
          {allOrders?.length > 0 ? (
            allOrders?.map((order) => <OrderedItem {...order} />)
          ) : loadingOrders ? (
            <Loading />
          ) : (
            <div style={{ textAlign: 'center' }}>
              <h4>No Orders</h4>
            </div>
          )}
        </CardWrapper>
        <h3>Complete Orders</h3>
        <CardWrapper>
          {completeOrders?.length > 0 ? (
            completeOrders?.map((order) => <OrderedItem {...order} />)
          ) : loadingOrders ? (
            <Loading />
          ) : (
            <div style={{ textAlign: 'center' }}>
              <h4>No Complete Orders</h4>
            </div>
          )}
        </CardWrapper>
      </Container>
    </>
  );
}

export default withAdmin(AdminIndex);
