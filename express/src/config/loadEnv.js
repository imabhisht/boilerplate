const path = require('path');
const dotenv = require('dotenv');

const loadEnv = () => {
  const env = process.env.NODE_ENV || 'dev';

  if(env !== 'dev' && env !== 'prod') {
    throw new Error('Invalid environment');
  }

  const envPath = path.resolve(__dirname, 'env', `${env}.env`);
  dotenv.config({ path: envPath });
};

module.exports = loadEnv;