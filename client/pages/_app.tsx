import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@services/apollo';
import { AuthWrapper } from '@services/auth';
import '@services/realm';
import Router from 'next/router';
import NProgress from 'nprogress';
import '../styles/global.css';
import '../styles/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <AuthWrapper>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </AuthWrapper>
  );
}

export default MyApp;
