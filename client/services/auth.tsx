import Error from 'next/error';
import {
  Context,
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as Realm from 'realm-web';
import Loading from '../components/app/screens/Loading/index';
import LoginOverlay from '../components/Login';
import { ENV_VARIABLES } from '../project.config';
import '../services/realm';
import { realmApp } from '../services/realm';
import * as definitions from '../ts/definitions';

interface AuthType {
  refreshAuth?: () => void;
  isLoading?: boolean;
  auth?: Realm.User;
  user?: definitions.user;
  googleAuthHandler?: () => void;
  logoutHandler?: () => void;
}

const authContext: Context<AuthType> = createContext({});

export const useSession = () => useContext(authContext);

export const AuthWrapper: FunctionComponent = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [auth, setAuth] = useState<Realm.User | null>(null);
  const [user, setUser] = useState(null);
  //TODO: Update to true for launch
  const [animation, setAnimation] = useState(false);

  console.log(user);

  useEffect(() => {
    setTimeout(() => {
      setAnimation(false);
    }, 2500);
  }, []);

  const refreshAuth = () => {
    if (realmApp?.currentUser) {
      setAuth(realmApp?.currentUser);
      setUser(realmApp.currentUser.customData);
      realmApp.currentUser.refreshCustomData().then((res) => setUser(res));
      setIsLoading(false);
    } else {
      setAuth(realmApp?.currentUser);
      setUser(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshAuth();
  }, [realmApp.currentUser]);

  const googleAuthHandler = async () => {
    try {
      const userRes = await realmApp.logIn(
        Realm.Credentials.google(`${window?.location?.origin}/auth/google`)
      );

      userRes
        .mongoClient('mongodb-atlas')
        .db(ENV_VARIABLES.mdb_db)
        .collection('users')
        .updateOne(
          { _id: userRes.id },
          {
            $set: {
              ...userRes.profile,
              _id: userRes.id,
            },
          },
          {
            upsert: true,
          }
        );
    } catch (err) {
      console.log(err);
    } finally {
      refreshAuth();
    }
  };

  const logoutHandler = async () => {
    await realmApp.currentUser.logOut();
    await refreshAuth();
  };

  const value = {
    refreshAuth,
    isLoading: isLoading || animation,
    auth,
    user,
    googleAuthHandler,
    logoutHandler,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const withLoader = (Component) => (props) => {
  const { isLoading } = useSession();

  if (isLoading) {
    return <Loading />;
  }

  return <Component {...props} />;
};

export const withAuth = (Component) => (props) => {
  const { isLoading, auth } = useSession();

  if (isLoading) {
    return <Loading />;
  }

  if (!auth) {
    return <LoginOverlay />;
  }

  return <Component {...props} />;
};

export const withAdmin = (Component) => (props) => {
  const { isLoading, auth, user } = useSession();

  if (isLoading) {
    return <Loading />;
  }

  if (!auth) {
    return <LoginOverlay />;
  }

  if (!user?.isAdmin) {
    return <Error statusCode={403} />;
  }

  return <Component {...props} />;
};

export const logoutHandler = () => {
  return realmApp.currentUser.logOut();
};
