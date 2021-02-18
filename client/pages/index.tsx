import Link from 'next/link';
import { FunctionComponent } from 'react';
import Seo from '../components/Seo';
import { PROJECT_CONFIG } from '../project.config';
import { useSession, withLoader } from '../services/auth';
import { getReadDb } from '../services/realm';

interface Props {
  items: any;
}

const IndexPage: FunctionComponent<Props> = ({ items, children }) => {
  console.log(items);
  const { isLoading } = useSession();

  return (
    <>
      <Seo titles={['Molodezh']} />
      <div className='container'>
        <h1>{PROJECT_CONFIG.name}</h1>
        {items?.map((item) => (
          <Link href={`/items/${item?._id}`}>
            <div>{item?.name}</div>
          </Link>
        ))}
      </div>
    </>
  );
};

export async function getStaticProps(ctx) {
  const db = await getReadDb();

  const res = await db.collection('items').find({});

  console.log(res);
  return {
    props: {
      items: JSON.parse(JSON.stringify(res)),
    }, // will be passed to the page component as props
    revalidate: 60,
  };
}

export default withLoader(IndexPage);
