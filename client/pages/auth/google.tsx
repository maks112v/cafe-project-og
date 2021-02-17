import { FunctionComponent, useEffect } from 'react';
import * as Realm from 'realm-web';

interface Props {}

const GoogleAuthCallback: FunctionComponent<Props> = ({ children }) => {
  useEffect(() => {
    Realm.handleAuthRedirect();
  }, []);
  return <></>;
};

export default GoogleAuthCallback;
