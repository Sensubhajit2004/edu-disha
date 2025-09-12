const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// PASTE YOUR USER UID HERE
const uid = 'oLH7uJtzsYci55xYyX0ZUZycTHa2';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log(`Success! ${uid} is now an admin.`);
    process.exit(0);
  })
  .catch(error => {
    console.error('Error setting custom claims:', error);
    process.exit(1);
  });
    