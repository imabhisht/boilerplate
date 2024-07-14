const { MongoClient } = require('mongodb');
const { logger } = require('../utils');

class MongoDBService {
  /**
   * Initializes MongoDB connection.
   * @param {string} uri - The MongoDB connection string.
   */
  constructor(uri) {
    this.uri = uri;
    this.client = new MongoClient(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.connect();
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db();
      logger.info("[System] Connected to MongoDB");

      // Create indexes for TTL
      await this.db.collection('sessions').createIndex({ expires_at: 1 }, { expireAfterSeconds: 0 });
    } catch (error) {
      console.log(error)
      logger.error("[System] Error connecting to MongoDB:", error.message);
      process.exit(1); // Exit the application if the connection fails
    }
  }

  /**
   * Get the MongoDB database instance.
   * @returns {Db} The MongoDB database instance.
   */
  getDatabase() {
    if (!this.db) {
      throw new Error('Database connection is not established.');
    }
    return this.db;
  }
}

module.exports = MongoDBService;
