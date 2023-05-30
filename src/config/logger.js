import winston from "winston";

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: 'errors.log',
        level: 'error',
      }),
    ],
  });

logger.info('This is an info message');
logger.warn('This is a warning message');
logger.error('This is an error message');

export default logger