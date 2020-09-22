import firebase from 'firebase';
import { createContext, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument, useDocumentData } from 'react-firebase-hooks/firestore';
import Loading from '../components/Loading';
import Login from '../components/Login';

const authContext = createContext({});

export const useSession = () => useContext(authContext);

export const AuthWrapper = ({ children }) => {
  const [auth, isLoading, error] = useAuthState(firebase.auth());
  const [user, fetchingUser, userError]: [any, Boolean, any] = useDocumentData(
    auth && firebase.firestore().collection('users').doc(auth.uid)
  );
  const [admin, fetchingAdmin, adminError]: [any, Boolean, any] = useDocument(
    auth && firebase.firestore().collection('admins').doc(auth.uid)
  );

  const value = {
    isLoading,
    auth,
    user,
    fetchingAdmin,
    isAdmin: admin?.exists || false,
  };
  console.log(value);

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const withLoader = (Component) => (props) => {
  const { isLoading }: any = useSession();

  if (isLoading) {
    return <Loading />;
  }

  return <Component {...props} />;
};

export const withAdmin = (Component) => (props) => {
  const { isLoading, auth, fetchingAdmin, isAdmin }: any = useSession();
  console.log(isLoading, auth, fetchingAdmin, isAdmin);
  if (isLoading || fetchingAdmin) {
    return <Loading />;
  }

  if (!isAdmin) {
    return <Login />;
  }

  return <Component {...props} />;
};
