const MongoDBService = require("./mongodb");

const mongoDB = new MongoDBService(process.env.MONGODB_URI);

module.exports = {
    mongoDB
}