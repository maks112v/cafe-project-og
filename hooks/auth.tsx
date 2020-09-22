import { useRouter } from 'next/router';
import { createContext, useContext } from 'react';

const authContext = createContext({});

export const useSession = () => useContext(authContext);

export const AuthWrapper = ({ children }) => {
  const { pathname } = useRouter();

  // const [user, fetchingUser, userError]: [any, Boolean, any] = useDocumentData(
  //   auth && firebase.firestore().collection('users').doc(auth.uid)
  // );

  const value = {
    // isLoading,
    // auth,
    // user,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
