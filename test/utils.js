const supertest = require('supertest');

//

let tester;

exports.initServer = async () => {
  if (!tester) {
    tester = new Tester();
    await tester.start();
  }

  return tester;
};

exports.initData = async (model, data) => {
  const promises = data.map(async (entry) => model.create(entry));

  return Promise.all(promises);
};

exports.sleep = async (ms) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

//

class Tester {
  constructor() {
    this.app = null;
    this.server = null;
  }

  async start() {
    if (!this.app) {
      const app = require('../server/server'); // eslint-disable-line global-require
      await exports.sleep(1000);
      this.app = app;
    }

    if (!this.server) {
      this.server = supertest.agent(this.app);
    }
  }
}
