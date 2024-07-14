require('dotenv').config();
const admin = require('firebase-admin');
const { logger } = require('../utils');

/**
 * @typedef {Object} FirebaseConfig
 * @property {string} projectId
 * @property {string} privateKey
 * @property {string} clientEmail
 * @property {string} privateKeyId
 * @property {string} clientX509CertUrl
 * @property {string} authUri
 * @property {string} tokenUri
 * @property {string} authProviderX509CertUrl
 * @property {string} clientC509CertUrl
 */

/**
 * FirebaseService class to initialize Firebase Admin SDK.
 */
class FirebaseService {
  /**
   * @param {FirebaseConfig} config - The configuration object for Firebase Admin SDK.
   */
  constructor(config) {
    try {
      this.app = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: config.projectId,
          privateKey: config.privateKey.replace(/\\n/g, '\n'),
          clientEmail: config.clientEmail,
          privateKeyId: config.privateKeyId,
          clientX509CertUrl: config.clientX509CertUrl,
          authUri: config.authUri,
          tokenUri: config.tokenUri,
          authProviderX509CertUrl: config.authProviderX509CertUrl,
          clientC509CertUrl: config.clientC509CertUrl,
        })
      });
      logger.info("[System] Connected with Firebase Admin");
    } catch (error) {
      logger.error("[System] Error connecting to Firebase Admin:", error.message);
    }
  }
}

module.exports = FirebaseService;
