import { FunctionComponent } from 'react';
import { BSON } from 'realm-web';
import { getReadDb } from '../../services/realm';

interface Props {
  item: any;
}

const ItemId: FunctionComponent<Props> = ({ item, children }) => {
  console.log(item);
  return <></>;
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
