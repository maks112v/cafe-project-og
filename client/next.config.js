const aliases = require('./aliases');

const version = '0.0.1';

module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    const newConfig = { ...config };
    newConfig.resolve.extensions = [
      '.scss',
      '.js',
      '.json',
      '.jsx',
      '.ts',
      '.tsx',
      '.svg',
    ];
    newConfig.resolve.alias = {
      ...config.resolve.alias,
      ...aliases.absoluteAliases,
    };
    return newConfig;
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    firebase: {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      databaseURL: process.env.databaseURL,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
      measurementId: process.env.measurementId,
    },
  },
  env: {
    firebase: {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      databaseURL: process.env.databaseURL,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
      measurementId: process.env.measurementId,
    },
  },
};
