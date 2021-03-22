import { FunctionComponent } from 'react';
import { useSession } from '../services/auth';
import Seo from './Seo';

interface Props {}

const LoginPage: FunctionComponent<Props> = ({ children }) => {
  const { googleAuthHandler } = useSession();
  return (
    <>
      <Seo titles={['Login']} />
      <div className='flex flex-col w-full min-h-screen md:flex-row'>
        <div className='flex items-center justify-center h-48 md:min-h-screen md:flex-grow bg-expresso'>
          <h1 className='font-serif text-5xl font-bold'>
            <span className='text-coffee'>Cafe</span>
            <span className='text-light'>Project</span>
          </h1>
        </div>
        <div className='flex flex-col items-center justify-center flex-grow'>
          <button
            onClick={googleAuthHandler}
            className='inline-flex items-center px-4 py-2 text-sm font-medium duration-200 border border-transparent rounded-md bg-border text-coffee hover:bg-coffee hover:text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee'
          >
            Login with Google
          </button>
          <div className='h-5' />
          <a onClick={{}}>Continue as Guest</a>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
