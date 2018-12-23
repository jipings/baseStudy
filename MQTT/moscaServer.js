
const mosca = require('mosca');
const setting = {
    port: 5112,
    backend: {
        type: 'zmq',
        json: false,
        zmq: require('zmq'),
        port: 'tcp://127.0.0.1:33334',
        controlPort: 'tcp://127.0.0.1:33334',
        delay: 5
    }
};

const server = new mosca.Server(setting);
server.on('ready',() => {
    console.log('Mosca server is up and running');
});

server.on('published', (packet, client) => {
    console.log('Published', packet.payload);
})