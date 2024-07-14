const FirebaseService = require("./firebase");

module.exports.firebaseAdmin = new FirebaseService({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
    clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    authUri: process.env.FIREBASE_AUTH_URI,
    tokenUri: process.env.FIREBASE_TOKEN_URI,
    authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    clientC509CertUrl: process.env.FIREBASE_CLIENT_C509_CERT_URL,
    });