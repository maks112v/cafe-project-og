import { AuthWrapper } from '../services/auth';
import '../services/init';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthWrapper>
      <Component {...pageProps} />
    </AuthWrapper>
  );
}

export default MyApp;
