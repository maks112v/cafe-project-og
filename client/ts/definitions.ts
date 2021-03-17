import { BSON } from 'realm-web';

export type user = {
  _id?: string;
  email?: string;
  firstName?: string;
  isAdmin?: boolean;
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
    isAdmin: 'bool?',
    lastName: 'string?',
    name: 'string?',
    pictureUrl: 'string?',
  },
  primaryKey: '_id',
};

export type order = {
  _id?: BSON.ObjectId;
  for?: string;
  item?: order_item;
  itemId?: item;
  owner?: user;
  status: Array<order_status>;
  syrups?: string;
};

export const orderSchema = {
  name: 'order',
  properties: {
    _id: 'objectId?',
    for: 'string?',
    item: 'order_item',
    itemId: 'item',
    owner: 'user',
    status: 'order_status[]',
    syrups: 'string?',
  },
  primaryKey: '_id',
};

export type order_item = {
  _id?: string;
  createdAt?: number;
  desc?: string;
  icon?: string;
  inputs: Array<string>;
  name?: string;
  type?: string;
};

export const order_itemSchema = {
  name: 'order_item',
  embedded: true,
  properties: {
    _id: 'string?',
    createdAt: 'int?',
    desc: 'string?',
    icon: 'string?',
    inputs: 'string[]',
    name: 'string?',
    type: 'string?',
  },
  primaryKey: '_id',
};

export type order_status = {
  name?: string;
  tag?: string;
  time?: string;
};

export const order_statusSchema = {
  name: 'order_status',
  embedded: true,
  properties: {
    name: 'string?',
    tag: 'string?',
    time: 'string?',
  },
};

export type item = {
  _id?: BSON.ObjectId;
  desc?: string;
  icon?: string;
  inputs: Array<string>;
  name?: string;
  type?: string;
};

export const itemSchema = {
  name: 'item',
  properties: {
    _id: 'objectId?',
    desc: 'string?',
    icon: 'string?',
    inputs: 'string[]',
    name: 'string?',
    type: 'string?',
  },
  primaryKey: '_id',
};
