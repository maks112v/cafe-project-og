import firebase from 'firebase';
import { FunctionComponent } from 'react';
import Seo from '../../Seo';

interface Props {}

const LoginScreen: FunctionComponent<Props> = ({ children }) => {
  const googleAuthHandler = async () => {
    await firebase
      .auth()
      .signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <>
      <Seo titles={['']} />
      <div className='flex items-center justify-center min-h-screen bg-light'>
        <div>
          <h1>Login</h1>
          <button className='btn' onClick={googleAuthHandler}>
            Google
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
