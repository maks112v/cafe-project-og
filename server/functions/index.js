const functions = require('firebase-functions');
const twilio = require('twilio')(
  'AC32dfeef228900b7e293fce8e0bcc3287',
  '336837090ea01495bf328328201b158e'
);
const admin = require('firebase-admin');

admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.orderSuccess = functions.firestore
  .document('orders/{id}')
  .onCreate(async (snap, context) => {
    // ... Your code here

    const data = snap.data();

    // await admin.database().ref('orderNumber').transaction()

    if (data.phone) {
      const res = await twilio.messages.create({
        body: `Hi ${data.name}, we will let you know when your ${data.item.name} it is ready. Check status and donate -> https://cafeproject.app/orders/${context.params.id}`,
        from: '+15402080061',
        to: `+1${data.phone}`,
      });
      await snap.ref.update({
        msid: res.sid,
      });
    }
  });

exports.notify = functions.firestore
  .document('notifs/{id}')
  .onCreate(async (snap, context) => {
    // ... Your code here

    const data = snap.data();

    if (data.phone) {
      const res = await twilio.messages.create({
        body: `Your ${data.item.name} is ready! 🎉 Come pick it up.`,
        from: '+15402080061',
        to: `+1${data.phone}`,
      });
      await snap.ref.update({
        msid: res.sid,
      });
    }
  });
