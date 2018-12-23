
const mqtt = require('mqtt');
const client = mqtt.createClient(5112, '172.24.24.30');

const num = 0;
setInterval(() => {
    client.publish('order','Hello mqtt'+(num++),{qos:1,retain:true});
},1000);
