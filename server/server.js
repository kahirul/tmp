const { initLogging } = require('./init/log');
const { initApp, bootApp, startApp } = require('./init/app');

//

const app = initApp();
module.exports = app;

async function main() {
  initLogging(app);
  await bootApp(app, __dirname);
  await startApp(app);
}

main();
