import { BSON } from 'realm-web';

export type user = {
  _id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  pictureUrl?: string;
};

export const userSchema = {
  name: 'user',
  properties: {
    _id: 'string?',
    email: 'string?',
    firstName: 'string?',
    lastName: 'string?',
    name: 'string?',
    pictureUrl: 'string?'
  },
  primaryKey: '_id'
};

export type doc = {
  _id?: BSON.ObjectId;
  content?: string;
  createdAt?: number;
  editors: Array<user>;
  lang?: doc_lang;
  masterDoc?: boolean;
  owner?: user;
  status?: string;
  title?: string;
  updatedAt?: number;
};

export const docSchema = {
  name: 'doc',
  properties: {
    _id: 'objectId?',
    content: 'string?',
    createdAt: 'int?',
    editors: 'user[]',
    lang: 'doc_lang',
    masterDoc: 'bool?',
    owner: 'user',
    status: 'string?',
    title: 'string?',
    updatedAt: 'int?'
  },
  primaryKey: '_id'
};

export type doc_lang = {
  code?: string;
  name?: string;
};

export const doc_langSchema = {
  name: 'doc_lang',
  embedded: true,
  properties: {
    code: 'string?',
    name: 'string?'
  }
};
