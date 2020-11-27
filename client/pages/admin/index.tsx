import styled from '@emotion/styled';
import firebase from 'firebase';
import moment from 'moment';
import { useState } from 'react';
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
  const [query, setQuery] = useState(
    firebase
      .firestore()
      .collection(`orders`)
      .where('status', '==', 'complete')
      .orderBy('meta.createdAt', 'desc')
      .where('meta.createdAt', '>', moment().startOf('day').valueOf())
  );
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
    query,
    {
      idField: 'id',
    }
  );

  return (
    <>
      <Seo titles={['Orders', 'Admin']} />
      <Container>
        <select
          onChange={(e) => {
            console.log(e.target.value);
            const newFilter = e.target.value;
            if (newFilter === 'today') {
              setQuery(
                firebase
                  .firestore()
                  .collection(`orders`)
                  .where('status', '==', 'complete')
                  .orderBy('meta.createdAt', 'desc')
                  .where(
                    'meta.createdAt',
                    '>',
                    moment().startOf('day').valueOf()
                  )
              );
            }
            if (newFilter === 'month') {
              setQuery(
                firebase
                  .firestore()
                  .collection(`orders`)
                  .where('status', '==', 'complete')
                  .orderBy('meta.createdAt', 'desc')
                  .where(
                    'meta.createdAt',
                    '>',
                    moment().startOf('month').valueOf()
                  )
              );
            }
            if (newFilter === 'all') {
              setQuery(
                firebase
                  .firestore()
                  .collection(`orders`)
                  .where('status', '==', 'complete')
                  .orderBy('meta.createdAt', 'desc')
              );
            }
          }}
        >
          <option value='today'>Today</option>
          <option value='month'>Month</option>
          <option value='all'>All</option>
        </select>
        <h3>Order Queue - {allOrders?.length}</h3>
        <CardWrapper>
          {allOrders?.length > 0 ? (
            allOrders?.map((order) => (
              <OrderedItem key={order?.id} {...order} />
            ))
          ) : loadingOrders ? (
            <Loading />
          ) : (
            <div style={{ textAlign: 'center' }}>
              <h4>No Orders</h4>
            </div>
          )}
        </CardWrapper>
        <h3>Complete Orders - {completeOrders?.length}</h3>
        <CardWrapper>
          {completeOrders?.length > 0 ? (
            completeOrders?.map((order) => (
              <OrderedItem key={order?.id} {...order} />
            ))
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
