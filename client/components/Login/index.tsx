import firebase from 'firebase';
import { Container } from '../../styles/Container';
import Button from '../Button';
import Seo from '../Seo';

export default function Login() {
  return (
    <>
      <Seo titles={['Login']} />
      <Container>
        <div>
          <h3>Login</h3>
        </div>
        <Button
          onClick={() => {
            firebase
              .auth()
              .signInWithRedirect(new firebase.auth.GoogleAuthProvider());
          }}
        >
          Login with Google
        </Button>
      </Container>
    </>
  );
}
