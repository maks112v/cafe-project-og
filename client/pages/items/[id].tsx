import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { BSON } from 'realm-web';
import * as yup from 'yup';
import Input from '../../components/Input';
import ItemInputResolver from '../../components/ItemInputResolver';
import Seo from '../../components/Seo';
import { AllIcons } from '../../data/Icons';
import { useSession } from '../../services/auth';
import { db, getReadDb } from '../../services/realm';
import * as definitions from '../../ts/definitions';
interface Props {
  item: definitions.item;
}

const ItemId: FunctionComponent<Props> = ({ item, children }) => {
  const { auth } = useSession();
  const router = useRouter();
  console.log(item);
  const onSubmitHandler = async (values) => {
    console.log(values);
    const res = await db.collection('orders').insertOne({
      ...values,
      itemId: {
        $oid: item?._id,
      },
      item,
      status: [
        {
          name: 'Placed',
          tag: 'placed',
          time: new Date().toISOString(),
        },
      ],
      owner: auth.id,
    });

    router.push(`/order/${res.insertedId}`);
  };
  return (
    <>
      <Seo titles={[item?.name]} />
      <div className='container max-w-3xl'>
        <img
          style={{ maxHeight: 125 }}
          src={AllIcons.find((icon) => icon?.slug === item?.icon)?.src}
        />
        <div>
          <h3>{item?.name}</h3>
          <div className='h-1' />
          <p>{item?.desc}</p>
        </div>
      </div>
      <div className='container max-w-3xl'>
        <Formik
          onSubmit={onSubmitHandler}
          initialValues={{ for: '', syrups: '' }}
          validationSchema={yup.object().shape({
            for: yup.string().required('Name required'),
          })}
        >
          <Form className='grid gap-3 my-3'>
            <Field component={Input} name='for' label='Order For*' />
            {item?.inputs?.map((input) => (
              <ItemInputResolver type={input} />
            ))}
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(ctx) {
  console.log(ctx);
  const id = ctx?.params?.id;
  const db = await getReadDb();

  const res = await db
    .collection('items')
    .findOne({ _id: new BSON.ObjectId(id) });

  console.log(res);
  return {
    props: {
      item: JSON.parse(JSON.stringify(res)),
    }, // will be passed to the page component as props
    revalidate: 60,
  };
}

export default ItemId;
