import { FunctionComponent } from 'react';
import Seo from '../components/Seo';
import { PROJECT_CONFIG } from '../project.config';
import { useSession, withLoader } from '../services/auth';
import { mongoClient } from '../services/mongodb';

interface Props {}

const IndexPage: FunctionComponent<Props> = ({ children }) => {
  const { isLoading } = useSession();
  return (
    <>
      <Seo titles={['Molodezh']} />
      <div className='container'>
        <h1>{PROJECT_CONFIG.name}</h1>
      </div>
    </>
  );
};

export async function getStaticProps(ctx) {
  await mongoClient.connect();
  const items = await mongoClient.db('molodezh').collection('items').find({});

  console.log(items);

  await mongoClient.close();
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default withLoader(IndexPage);
