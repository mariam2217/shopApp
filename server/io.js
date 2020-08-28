const socketIo = require('socket.io')

class Socket {
    constructor (server) {
        this.server = socketIo(server);
        this._clients = new Map();
        this.bind();
    }
    
    static getInstance(server) {
        if (!Socket.instance) {
            Socket.instance = new Socket(server);
        }

        return Socket.instance;
    }

    bind () {
        this.server.on('connection', (socket) => {
            this._clients.set(socket, true);
            console.log('a user connected');
            socket.on('disconnect', () =>{
                this._clients.delete(socket);
                console.log('user disconnected');
              });
          });
    }

    send (event, params) {
        Array.from(this._clients.keys()).forEach((socket) => socket.emit(event, params))
    }
}

module.exports = Socket;