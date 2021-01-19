import Button from '@components/Button';
import Seo from '@components/Seo';
import styled from '@emotion/styled';
import { Card } from '@styles/Card';
import { Container } from '@styles/Container';
import firebase from 'firebase';
import { FunctionComponent } from 'react';

const DonateCard = styled(Card)({
  display: 'grid',
  gap: 10,
});

const LaterButton = styled.div({
  textAlign: 'center',
  margin: `20px 0 10px`,
});

interface Props {
  id: any;
}

const DonateModal: FunctionComponent<Props> = ({ id, children }) => {
  return (
    <Container>
      <Seo titles={['Donate']} />
      <h1>Order Placed</h1>
      <p>
        We are preparing your order. In the meantime, you should consider
        donating to our mission trips.
      </p>

      <DonateCard>
        <h3>Donate</h3>
        <p>
          Your gift will help us <b>cover your drink</b> as well as{' '}
          <b>support our missions</b>.
        </p>
      </DonateCard>
      <div style={{ height: 20 }} />
      <DonateCard>
        <h3>Pay</h3>
        <p>Choose your price. We accept cash and card also at the window.</p>
        <Button href='https://cash.app/$molodezh' target='_blank'>
          Cash App
        </Button>
        <Button
          onClick={() => {
            return firebase.firestore().collection('orders').doc(id).update({
              donate: 'cash',
            });
          }}
        >
          Already Donated
        </Button>
      </DonateCard>
      <LaterButton>
        <a
          onClick={() => {
            return firebase.firestore().collection('orders').doc(id).update({
              donate: 'none',
            });
          }}
        >
          Donate Later
        </a>
      </LaterButton>
    </Container>
  );
};

export default DonateModal;
