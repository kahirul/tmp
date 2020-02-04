exports.disableModelDefaultRemoteMethods = disableModelDefaultRemoteMethods;
function disableModelDefaultRemoteMethods(Model) {
  Model.disableRemoteMethodByName('upsert');
  Model.disableRemoteMethodByName('find');
  Model.disableRemoteMethodByName('replaceOrCreate');
  Model.disableRemoteMethodByName('create');
  Model.disableRemoteMethodByName('prototype.updateAttributes');
  Model.disableRemoteMethodByName('findById');
  Model.disableRemoteMethodByName('exists');
  Model.disableRemoteMethodByName('replaceById');
  Model.disableRemoteMethodByName('deleteById');
  Model.disableRemoteMethodByName('createChangeStream');
  Model.disableRemoteMethodByName('count');
  Model.disableRemoteMethodByName('findOne');
  Model.disableRemoteMethodByName('update');
  Model.disableRemoteMethodByName('upsertWithWhere');

  if (Model.settings && Model.settings.relations) {
    const relations = Object.keys(Model.settings.relations);
    relations.forEach((relation) => {
      Model.disableRemoteMethod(`__get__${relation}`);
      Model.disableRemoteMethod(`__findById__${relation}`);
      Model.disableRemoteMethod(`__count__${relation}`);
      Model.disableRemoteMethod(`__create__${relation}`);
      Model.disableRemoteMethod(`__updateById__${relation}`);
      Model.disableRemoteMethod(`__delete__${relation}`);
      Model.disableRemoteMethod(`__destroyById__${relation}`);
    });
  }
}

exports.disableAppDefaultRemoteMethods = disableAppDefaultRemoteMethods;
function disableAppDefaultRemoteMethods(app) {
  const models = Object.keys(app.models);
  models.forEach((model) => {
    const Model = app.models[model];
    disableModelDefaultRemoteMethods(Model);
  });
}
