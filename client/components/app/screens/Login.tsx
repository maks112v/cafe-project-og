import { FunctionComponent } from 'react';
import Seo from '../../Seo';

interface Props {}

const LoginScreen: FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <Seo titles={['']} />
      <div className='flex items-center justify-center min-h-screen bg-light'>
        <div>
          <h1>Login</h1>
          <button className='btn'>Google</button>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
