var path = require('path');
var fs = require('fs');
var express = require('express');
var webpack = require('webpack');
var ip = require('ip');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var config = require('./webpack.config.js');

// var ROOT_PATH = path.resolve(__dirname)

var app = express();
var compiler = webpack(config);
var middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath, 
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false,
    },
})

app.use(middleware);
app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res) => {
    if(req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'images-icon'});
        res.end();
        return;
    };
    res.write(middleware.fileSystem.readdirSync(path.join('./','build/index.html')));
    res.end();
})

app.listen(9090, (err) => {
    if(err) {console.log(err)};
    var c = require('child_process');
    var link = 'http://' + ip.address() + ':9090';
    c.exec('open ' + link);
    console.info('==> 🌎 Listening on  ' + (ip.address() + ':3000').blue);
})