const http = require('http');

class Server {
  constructor() {
    this.server = http.createServer((...args) => this._handler(...args));
  }

  _handler(req, res) {
    console.log('Connected!');
    this._application(req, res);
  }

  set application (expressApp) {
    this._application = expressApp;
  }

  listen(port) {
    this.server.listen(port);
  }
}

module.exports = Server;

