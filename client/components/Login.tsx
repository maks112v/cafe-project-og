import { FunctionComponent } from 'react';
import { useSession } from '../services/auth';
import Seo from './Seo';

interface Props {}

const LoginPage: FunctionComponent<Props> = ({ children }) => {
  const { googleAuthHandler } = useSession();
  return (
    <div className='flex w-full min-h-screen'>
      <Seo titles={['Login']} />
      <div className='flex items-center justify-center w-1/2 min-h-screen bg-expresso'>
        <h1 className='font-serif text-5xl font-bold'>
          <span className='text-coffee'>Cafe</span>
          <span className='text-light'>Project</span>
        </h1>
      </div>
      <div className='flex items-center justify-center w-1/2'>
        <button
          onClick={googleAuthHandler}
          className='inline-flex items-center px-4 py-2 text-sm font-medium duration-200 border border-transparent rounded-md bg-border text-coffee hover:bg-coffee hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee'
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
