import firebase from 'firebase';
import {
  Context,
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';
import Loading from '../components/app/screens/Loading/index';
import Login from '../components/app/screens/Login';
import Seo from '../components/Seo';

interface AuthType {
  isLoading?: boolean;
  auth?: firebase.User;
  profile?: any;
  isAdmin?: boolean;
}

const authContext: Context<AuthType> = createContext({});

export const useSession = () => useContext(authContext);

export const AuthWrapper: FunctionComponent = ({ children }) => {
  // const [auth, isLoading, error] = useAuthState(firebase.auth());
  const [isLoading, setIsLoading] = useState(true);
  const [animation, setAnimation] = useState(true);
  const [auth, setAuth] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  console.log(isLoading, auth, profile, isAdmin);

  useEffect(() => {
    setTimeout(() => {
      setAnimation(false);
    }, 2500);
  }, []);

  useEffect(() => {
    let unsubscribe = [];
    const authUnsubscribe = firebase.auth().onAuthStateChanged(async (auth) => {
      try {
        setAuth(auth);
        if (auth) {
          const accountUnsubscribe = firebase
            .firestore()
            .collection('users')
            .doc(auth.uid)
            .onSnapshot((snap) => {
              setProfile(snap.data());
            });
          unsubscribe.push(accountUnsubscribe);
          const adminUnsubscribe = firebase
            .firestore()
            .collection('admins')
            .doc(auth.uid)
            .onSnapshot((snap) => {
              console.log(snap);
              setIsAdmin(snap.exists);
            });
          unsubscribe.push(adminUnsubscribe);
          setIsLoading(false);
        } else {
          setProfile(null);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    });
    unsubscribe.push(authUnsubscribe);

    return () => {
      return Promise.all(unsubscribe);
    };
  }, []);

  const value: AuthType = {
    isLoading: isLoading || animation,
    auth,
    profile,
    isAdmin,
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
  const { isLoading, auth, isAdmin }: any = useSession();
  if (isLoading) {
    return <Loading />;
  }

  if (!auth) {
    return <Login />;
  }

  if (!isAdmin) {
    return (
      <>
        <Seo titles={['Forbidden', 'Admin']} />
        <div className='container'>
          <div>
            <h3>403 Forbidden</h3>
            <p>It looks like you are not allowed.</p>
          </div>
        </div>
      </>
    );
  }

  return <Component {...props} />;
};
