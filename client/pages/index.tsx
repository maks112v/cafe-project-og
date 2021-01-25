import { FunctionComponent } from 'react';
import Seo from '../components/Seo';
import { PROJECT_CONFIG } from '../project.config';
import { useSession, withLoader } from '../services/auth';

interface Props {}

const IndexPage: FunctionComponent<Props> = ({ children }) => {
  const { isLoading } = useSession();
  return (
    <>
      <Seo titles={['']} />
      <div className='container'>
        <h1>{PROJECT_CONFIG.name}</h1>
      </div>
    </>
  );
};

export default withLoader(IndexPage);
