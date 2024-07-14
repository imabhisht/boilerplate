// Load environment variables
require('./config/loadEnv')();

const express = require('express');
const cors = require('cors');
const { logger } = require('./utils');
const { firebaseAdmin } = require('./auth');
const middlewares = require('./middlewares');
const routes = require('./routes/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middlewares.errorHandler);

app.get('/', (req, res, next) => {
  try {
    // const error = new Error('This is an error');
    // error.status = 400; // Set the status code for this error
    // throw error;
    res.send('Hello, world!');
  } catch (error) {
    next(error);
  }
});

app.use('/auth', routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.log(`Server running: http://localhost:${PORT}`);
});
