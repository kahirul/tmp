const path = require('path');
const fs = require('fs');

/**
 * Appends remote methods to model
 * Creates a dummy loopback model if necessary
 */
module.exports = function appendControllers(app) {
  const config = require(path.resolve(__dirname, '../model-config.json')); // eslint-disable-line
  const dirs = config._meta.apis || []; // eslint-disable-line
  const models = Object.keys(config).map((x) => x.toLowerCase());

  dirs.forEach((dir) => {
    dir = path.resolve(__dirname, '../', dir);
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      if (file.includes('.controller.js')) {
        const Model = findOrCreateModel(file);
        const filepath = path.resolve(dir, file);
        require(filepath)(app, Model); // eslint-disable-line
      }
    });
  });

  //

  function findOrCreateModel(file) {
    const name = file.split('.')[0];
    if (name[0] === '_') return null;

    if (models.includes(formatModelName(name).toLowerCase())) {
      return app.models[formatModelName(name)];
    }

    const Model = app.datasources.memory.createModel(formatModelName(name), {});
    return app.model(Model);
  }

  function formatModelName(name) {
    return name
      .toLowerCase()
      .split('-')
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join('');
  }
};
