import * as Realm from 'realm-web';
import { ENV_VARIABLES } from '../project.config';

export const realmApp: Realm.App = new Realm.App({
  id: ENV_VARIABLES.mdb_appId,
});

const mongo = realmApp?.currentUser?.mongoClient(ENV_VARIABLES.mdb_atlas);

export const db = mongo?.db(ENV_VARIABLES.mdb_db);
