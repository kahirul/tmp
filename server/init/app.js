const loopback = require('loopback');
const boot = require('loopback-boot');
const { disableAppDefaultRemoteMethods } = require('./utils');

//

exports.initApp = function initApp() {
  const app = loopback();

  app.start = function start() {
    // start the web server
    return app.listen(() => {
      app.emit('started');
      const baseUrl = app.get('url').replace(/\/$/, '');
      console.log('Web server listening at: %s', baseUrl); // eslint-disable-line no-console, max-len
      if (app.get('loopback-component-explorer')) {
        const explorerPath = app.get('loopback-component-explorer').mountPath;
        console.log('Browse your REST API at %s%s', baseUrl, explorerPath); // eslint-disable-line no-console, max-len
      }
    });
  };

  return app;
};

exports.bootApp = async function bootApp(app, dirname) {
  return new Promise((resolve, reject) => {
    boot(app, dirname, (err) => {
      if (err) reject(err);
      resolve(app);
    });
  });
};

exports.startApp = function startApp(app) {
  disableAppDefaultRemoteMethods(app);
  if (!app.socketClient && !app.pubsub) app.start();
};
