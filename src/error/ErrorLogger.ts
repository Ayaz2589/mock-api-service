import winston, { Logger, format } from 'winston';
const { combine, timestamp, label, printf } = format;

class ErrorLogger<T extends Record<string, any>> {
  private logger: Logger;

  constructor(options: winston.LoggerOptions) {
    this.logger = winston.createLogger(options);
  }

  logError(error: Error, meta?: T) {
    this.logger.error(error.message, { stack: error.stack, ...meta });
  }
}

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Usage
const loggerOptions: winston.LoggerOptions = {
  level: 'error',
  format: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    myFormat
  ),
  transports: [
    new winston.transports.Console()
  ]
};

const errorLogger = new ErrorLogger(loggerOptions);

export default errorLogger;