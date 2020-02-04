const winston = require('winston');

exports.initLogging = (app) => {
  initLogger(app);
  registerErrorLoggingMiddleware(app);
  registerUncaughtExceptionLogger(app);
};

const formats = {
  errorStack: (info) => {
    if (info instanceof Error) {
      return {
        ...info,
        message: info.message,
        stack: info.stack,
      };
    }
    return info;
  },

  timestampConsole: (info) => {
    let { message } = info;
    if (info.stack) {
      message = '';
      message += info.method ? `${info.method} ` : '';
      message += info.path ? `${info.path} - ` : '';
      message += info.status || info.statusCode ? `${info.status || info.statusCode} ` : '';
      message += info.code ? `${info.code} ` : '';
      message += info.id ? `${info.id} ` : '';
      message += info.stack;
    }
    return `${new Date().toISOString()} ${info.level.toUpperCase()} - ${message}`;
  },
};

//

function initLogger(app) {
  const transports = [
    new winston.transports.Console({
      format: winston.format.printf(formats.timestampConsole),
    }),
  ];

  app.logger = winston.createLogger({
    format: winston.format.combine(
      winston.format(formats.errorStack)(),
      winston.format.json(),
    ),
    defaultMeta: {
      service: 'wb-simple-api',
      environment: 'development',
    },
    transports,
  });
}

//

function registerErrorLoggingMiddleware(app) {
  app.middleware('final:after', () => function log(err, req, res, next) {
    app.logger.warn(err);
    next(err);
  });
}

function registerUncaughtExceptionLogger(app) {
  process.on('uncaughtException', (err) => {
    app.logger.error(err);
    setTimeout(() => {
      process.exit();
    }, 10000);
  });

  process.on('unhandledRejection', (err) => {
    app.logger.error(err);
  });
}
