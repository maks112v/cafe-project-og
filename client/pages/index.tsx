import Seo from '@components/Seo';
import { AllIcons } from '@data/Icons';
import { useSession, withLoader } from '@services/auth';
import { getReadDb } from '@services/realm';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface Props {
  items: any;
}

const IndexPage: FunctionComponent<Props> = ({ items, children }) => {
  const { isLoading } = useSession();

  return (
    <>
      <Seo titles={['Molodezh']} />
      <div className='container max-w-3xl mt-5 mb-20'>
        <div className='grid gap-5 my-5 md:grid-cols-2'>
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
                <div className='flex flex-col flex-grow p-4'>
                  <h3>{item?.name}</h3>
                  <div className='h-1' />
                  <p className='line-clamp-3'>{item?.desc}</p>
                  <div className='flex-grow h-4' />
                  <div>
                    <button className='btn btn-primary'>Order</button>
                  </div>
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
