/**
 * Install a `/` route that returns the server status
 */
module.exports = function root(server) {
  const router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);
};
