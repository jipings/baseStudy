
const mqtt = require('mqtt');
const client = mqtt.createClient(5112,'localhost',{clientId:'1',clean:false});

client.subscribe('test', {qos:1});

client.on('message', (topic, message) => {
    console.log(message);
})