import styled from '@emotion/styled';
import { useStore } from '@hooks/store';
import Link from 'next/link';
import OrderItem from '../components/OrderItem';
import Orders from '../components/Orders';
import Seo from '../components/Seo';
import { Container } from '../styles/Container';

const CardWrapper = styled.div({
  display: 'grid',
  gap: 20,
});

const ItemCard = styled.div({});

function Home({ items }) {
  const { selectableDrinks } = useStore();

  return (
    <>
      <Seo titles={['Order']} />
      <Container>
        <Orders />
        <h1>Order</h1>
        <p>Get a little something special</p>
        <CardWrapper>
          {selectableDrinks
            ?.filter((data) => data?.available)
            ?.map((data) => (
              <Link key={data?.id} href={`/orders/new/${data?.id}`}>
                <OrderItem
                  {...data}

                  // onClick={() => setSelectedDrink(data?.id)}
                />
              </Link>
            ))}
        </CardWrapper>
      </Container>
    </>
  );

  return (
    <>
      <Seo titles={['Order']} />
      <Container>
        <Orders />
        <h1>New Order</h1>
        <p>Click on a drink to place an order.</p>
        <CardWrapper>
          {selectableDrinks
            ?.filter((data) => data?.available)
            ?.map((data) => (
              <Link key={data?.id} href={`/orders/new/${data?.id}`}>
                <OrderItem
                  {...data}

                  // onClick={() => setSelectedDrink(data?.id)}
                />
              </Link>
            ))}
        </CardWrapper>
      </Container>
    </>
  );
}

// export async function getStaticProps(context) {
//   try {
//     const query = await firebase.firestore().collection('items').get();

//     let items = [];

//     query.docs.forEach((item) => {
//       items.push({ id: item.id, ...item.data() });
//     });

//     return {
//       props: {
//         items,
//       }, // will be passed to the page component as props
//       revalidate: 30,
//     };
//   } catch (err) {
//     console.log(err);

//     return {
//       props: {
//         err: {
//           // status: err?.status,
//           message: err?.message,
//         },
//       }, // will be passed to the page component as props
//       revalidate: 1,
//     };
//   }
// }

export default Home;
