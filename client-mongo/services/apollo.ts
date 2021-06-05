import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ENV_VARIABLES } from '../project.config';
import { realmApp } from './realm';

const graphql_url = `https://realm.mongodb.com/api/client/v2.0/app/${ENV_VARIABLES.mdb_appId}/graphql`;

async function getValidAccessToken() {
  await realmApp.currentUser.refreshCustomData();

  // Get a valid access token for the current user
  return realmApp?.currentUser?.accessToken;
}

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: graphql_url,
    fetch: async (uri, options) => {
      const accessToken = await getValidAccessToken();
      options.headers['Authorization'] = `Bearer ${accessToken}`;
      return fetch(uri, options);
    },
  }),
  cache: new InMemoryCache(),
});
