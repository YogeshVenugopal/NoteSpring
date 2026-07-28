import morgan from 'morgan';
import logger from '../Utils/logger.js';

const stream = {
    write: (message) => logger.http(message.trim()),
};

const requestLogger = morgan(
  process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  { stream }
);

export default requestLogger;