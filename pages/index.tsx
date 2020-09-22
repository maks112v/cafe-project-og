import styled from '@emotion/styled';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import InputField from '../components/InputField';
import OrderItem from '../components/OrderItem';
import Seo from '../components/Seo';
import { StoreType, useStore } from '../hooks/store';

const Container = styled.div({
  maxWidth: 500,
  margin: '50px auto',
  padding: 10,
});

const CardWrapper = styled.div({
  display: 'grid',
  gap: 20,
  gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr))`,
});

const ItemCard = styled.div({});

const StyledForm = styled(Form)({
  display: 'grid',
  gap: 20,
});

export default function Home() {
  const { selectableDrinks }: StoreType = useStore();
  const [selectedDrink, setSelectedDrink] = useState(null);

  return (
    <>
      <Seo titles={['Order']} />
      <Container>
        <h1>Order</h1>
        {selectedDrink ? (
          <Formik initialValues={{ name: '' }}>
            <StyledForm>
              <InputField name='name' placeHolder='Name' required />
              <InputField name='name' placeHolder='Name' required />
            </StyledForm>
          </Formik>
        ) : (
          <CardWrapper>
            {selectableDrinks.map((data) => (
              <OrderItem {...data} onClick={() => setSelectedDrink(data?.id)} />
            ))}
          </CardWrapper>
        )}
      </Container>
    </>
  );
}
