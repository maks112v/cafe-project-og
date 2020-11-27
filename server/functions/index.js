const functions = require('firebase-functions');
const twilio = require('twilio')(
  'AC32dfeef228900b7e293fce8e0bcc3287',
  '336837090ea01495bf328328201b158e'
);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
