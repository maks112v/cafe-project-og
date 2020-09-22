import firebase from 'firebase';
import { createContext, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import Loading from '../components/Loading';

const authContext = createContext({});

export const useSession = () => useContext(authContext);

export const AuthWrapper = ({ children }) => {
  const [auth, isLoading, error] = useAuthState(firebase.auth());
  const [user, fetchingUser, userError]: [any, Boolean, any] = useDocumentData(
    auth && firebase.firestore().collection('users').doc(auth.uid)
  );

  const value = {
    isLoading,
    auth,
    user,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const withLoader = (Component) => (props) => {
  const { isLoading }: any = useSession();

  if (isLoading) {
    return <Loading />;
  }

  return <Component {...props} />;
};

export const withAuth = (Component) => (props) => {
  const { isLoading, auth }: any = useSession();
  if (isLoading) {
    return <Loading />;
  }

  return <Component {...props} />;
};
