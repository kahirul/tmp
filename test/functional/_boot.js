const { initServer, initData } = require('../utils');
const data = require('../data.json');

describe('boot :', () => {
  it('should boot without errors', async () => {
    await initServer();
  });

  it('should initialize data', async () => {
    const { app } = await initServer();
    const { models } = app;

    await Promise.all([
      initData(models.Joke, data.jokes),
    ]);
  });
});
