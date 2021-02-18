import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const MongoClientImport = require('mongodb').MongoClient;

const uri = `mongodb+srv://static:jYtaR454kZnbrqvA@cluster0.eksgu.mongodb.net/molodezh?retryWrites=true&w=majority`;
export const mongoClient = new MongoClientImport(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
