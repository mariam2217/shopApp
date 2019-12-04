const http = require('http');

class Server {
  constructor() {
    this.server = http.createServer(this._handler);
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


