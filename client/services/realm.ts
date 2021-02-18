import * as Realm from 'realm-web';
import { ENV_VARIABLES } from '../project.config';

export const realmApp: Realm.App = new Realm.App({
  id: ENV_VARIABLES.mdb_appId,
});

const mongo = realmApp?.currentUser?.mongoClient(ENV_VARIABLES.mdb_atlas);

export const db = mongo?.db(ENV_VARIABLES.mdb_db);

export const getReadDb = async () => {
  const mongo = await realmApp.logIn(
    Realm.Credentials.apiKey(ENV_VARIABLES.staticKey)
  );
  return mongo.mongoClient(ENV_VARIABLES.mdb_atlas).db(ENV_VARIABLES.mdb_db);
};
