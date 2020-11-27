import Button from '@components/Button';
import InputField from '@components/InputField';
import OrderItem from '@components/OrderItem';
import Seo from '@components/Seo';
import styled from '@emotion/styled';
import { useSession, withAuth } from '@hooks/auth';
import { useStore } from '@hooks/store';
import { Container } from '@styles/Container';
import firebase from 'firebase';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import * as yup from 'yup';

interface Props {}

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

const OrderItemPage: FunctionComponent<Props> = ({ children, ...rest }) => {
  const {
    push,
    query: { id },
  } = useRouter();
  const {
    selectableDrinks,
    getDrinkbyId,
    teaFlavors,
    syrupFlavors,
    syrupAmount,
  }: any = useStore();
  const { auth, user }: any = useSession();

  console.log(user);

  const doc = getDrinkbyId(id);

  async function handleSubmit(values) {
    try {
      let userId;
      if (auth) {
        userId = auth?.uid;
      } else {
        const res = await firebase.auth().signInAnonymously();
        await firebase
          .firestore()
          .collection(`users`)
          .doc(res?.user?.uid)
          .set({ name: values?.name }, { merge: true });
        userId = res?.user?.uid;
      }
      const orderRes = await firebase
        .firestore()
        .collection(`orders`)
        .add({
          item: doc,
          ...values,
          status: 'ordered',
          userId,
          meta: {
            createdAt: new Date().valueOf(),
            updatedAt: new Date().valueOf(),
          },
        });
      push('/orders/[id]', `/orders/${orderRes.id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Seo titles={[doc?.name, 'Order']} />
      <Container>
        <h1>New Order</h1>
        <p>Click on a drink to place an order.</p>
        <Formik
          validationSchema={schema}
          initialValues={{ name: user?.name, phone: user?.phone }}
          onSubmit={handleSubmit}
        >
          <StyledForm>
            <OrderItem {...doc} />
            <InputField autofocus name='name' placeholder='Name' />
            <InputField
              autofocus
              name='phone'
              placeholder='Phone'
              type='phone'
            />
            {id === 'e3yqr9fn31' && (
              <InputField
                name='details.teaId'
                as='select'
                placeholder='Tea Flavor'
              >
                <option>Select Tea Flavor</option>
                {teaFlavors?.map(({ name, id, details }) => (
                  <option value={id}>
                    {name} - {details}
                  </option>
                ))}
              </InputField>
            )}
            {id !== 'e3yqr9fn31' && (
              <div>
                <InputField
                  name='details.syrupId'
                  as='select'
                  placeholder='Syrup Flavor'
                >
                  <option>Select Syrup Flavor</option>
                  {syrupFlavors?.map(({ name, id }) => (
                    <option value={id}>{name}</option>
                  ))}
                </InputField>
                <br></br>
                <InputField
                  name='details.syrupAmount'
                  as='select'
                  placeholder='Syrup Pumps'
                >
                  <option>Syrup Pumps</option>
                  {syrupAmount?.map(({ amount, id }) => (
                    <option value={id}>{amount}</option>
                  ))}
                </InputField>
              </div>
            )}
            <InputField
              name='special'
              placeholder='Special requests or a good joke.'
            />
            <InputField name='name' placeHolder='Name' required />
            <Button type='submit'>Place Order</Button>
            <ResetButton>
              <Link href='/'>
                <a>Start Over</a>
              </Link>
            </ResetButton>
          </StyledForm>
        </Formik>
      </Container>
    </>
  );
};

// export async function getStaticPaths() {
//   try {
//     const query = await firebase.firestore().collection('items').get();

//     let itemPages = [];

//     query.docs.forEach((item) => {
//       itemPages.push({ params: { id: item.id } });
//     });

//     return {
//       paths: itemPages,
//       fallback: false, // See the "fallback" section below
//     };
//   } catch (err) {
//     console.log(err);
//   }
// }

// export async function getStaticProps(context) {
//   const id = context?.params?.id;

//   const query = await firebase.firestore().collection('items').doc(id).get();

//   return {
//     props: {
//       doc: {
//         id: query.id,
//         ...query.data(),
//       },
//     }, // will be passed to the page component as props
//   };
// }

export default withAuth(OrderItemPage);
