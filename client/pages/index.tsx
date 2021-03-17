import Link from 'next/link';
import { FunctionComponent } from 'react';
import Seo from '../components/Seo';
import { AllIcons } from '../data/Icons';
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
      <div className='container max-w-3xl mt-5 mb-20'>
        <h1>{PROJECT_CONFIG.name}</h1>
        <div className='grid grid-cols-2 gap-5 my-5'>
          {items?.map((item) => (
            <Link href={`/items/${item?._id}`}>
              <div className='flex flex-col overflow-hidden bg-white border rounded cursor-pointer hover:shadow-lg'>
                <div className='flex items-center justify-center h-56 p-4 bg-light bg-accent'>
                  <img
                    style={{ maxHeight: 125 }}
                    src={
                      AllIcons.find((icon) => icon?.slug === item?.icon)?.src
                    }
                  />
                </div>
                <div className='p-4'>
                  <h3>{item?.name}</h3>
                  <div className='h-1' />
                  <p>{item?.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
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
