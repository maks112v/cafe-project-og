import styled from '@emotion/styled';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import Button from '../components/Button';
import InputField from '../components/InputField';
import OrderItem from '../components/OrderItem';
import Seo from '../components/Seo';
import { StoreType, useStore } from '../hooks/store';

const Container = styled.div({
  maxWidth: 500,
  margin: '0 auto',
  padding: `50px 20px`,
  minHeight: '80vh',
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

const ResetButton = styled.div({
  textAlign: 'center',
});

const schema = yup.object().shape({
  name: yup.string().required('Please add your name'),
});

export default function Home() {
  const { selectableDrinks, getDrinkbyId }: StoreType = useStore();
  const [selectedDrink, setSelectedDrink] = useState(null);

  return (
    <>
      <Seo titles={['Order']} />
      <Container>
        <h1>Order</h1>
        {selectedDrink ? (
          <Formik validationSchema={schema} initialValues={{ name: '' }}>
            <StyledForm>
              <OrderItem {...getDrinkbyId(selectedDrink)} />

              <InputField name='name' placeHolder='Name' />
              {/* <InputField name='name' placeHolder='Name' required /> */}
              <Button>Place Order</Button>
              <ResetButton>
                <a
                  onClick={() => {
                    if (window.confirm('Restart Order?')) {
                      setSelectedDrink(null);
                    }
                  }}
                >
                  Start Over
                </a>
              </ResetButton>
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
