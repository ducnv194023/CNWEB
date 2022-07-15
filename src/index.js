const mongoose = require('mongoose');
const app = require('./app');
const logger = require('logger');

let server;
const url = process.env.MONGO_URL ;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 1000
}).then(() => {
    logger.info('Connected to MongoDB');
    server = app.listen(process.env.PORT, () => {
      logger.info(`Listening to port ${process.env.PORT}`);
    });
  });


const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
