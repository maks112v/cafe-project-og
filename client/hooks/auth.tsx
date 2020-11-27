import firebase from 'firebase';
import { Context, createContext, FunctionComponent, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument, useDocumentData } from 'react-firebase-hooks/firestore';
import Loading from '../components/Loading';
import Login from '../components/Login';
import Seo from '../components/Seo';
import { Container } from '../styles/Container';

interface AuthType {
  isLoading?: Boolean;
  auth?: any;
  user?: any;
  fetchingAdmin?: Boolean;
  isAdmin?: Boolean;
}

const authContext: Context<AuthType> = createContext({});

export const useSession = () => useContext(authContext);

export const AuthWrapper: FunctionComponent = ({ children }) => {
  const [auth, isLoading, error] = useAuthState(firebase.auth());
  console.log(auth);
  const [user, fetchingUser, userError]: [any, Boolean, any] = useDocumentData(
    auth && firebase.firestore().collection('users').doc(auth.uid)
  );
  const [admin, fetchingAdmin, adminError]: [any, Boolean, any] = useDocument(
    auth && firebase.firestore().collection('admins').doc(auth.uid)
  );

  const value: AuthType = {
    isLoading: isLoading || fetchingUser,
    auth,
    user,
    fetchingAdmin,
    isAdmin: admin?.exists || false,
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

  if (!auth) {
    firebase.auth().signInAnonymously();
    return <Loading />;
  }

  return <Component {...props} />;
};

export const withAdmin = (Component) => (props) => {
  const { isLoading, auth, fetchingAdmin, isAdmin }: any = useSession();
  if (isLoading || fetchingAdmin) {
    return <Loading />;
  }

  if (!auth) {
    return <Login />;
  }

  if (!isAdmin) {
    return (
      <>
        <Seo titles={['Forbidden', 'Admin']} />
        <Container>
          <div>
            <h3>403 Forbidden</h3>
            <p>It looks like you are not allowed.</p>
          </div>
        </Container>
      </>
    );
  }

  return <Component {...props} />;
};
