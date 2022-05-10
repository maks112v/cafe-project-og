const functions = require('firebase-functions');
const twilio = require('twilio')(
  'TWILIO_ACCOUNT_SID',
  'TWILIO_AUTH_TOKEN'
); // Deprecated feature so keys are removed 
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
        body: `Hi ${data.name},\n\nWe're working on your ${data.item.name} and we'll let you know when it is ready.\n\nCheck the status and donate here 👇\n\n https://cafeproject.app/orders/${context.params.id}`,
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
        body: `Your ${data.item.name} is now ready! ☕\n\nDrop by the kitchen to pick it up.`,
        from: '+15402080061',
        to: `+1${data.phone}`,
      });
      await snap.ref.update({
        msid: res.sid,
      });
    }
  });
