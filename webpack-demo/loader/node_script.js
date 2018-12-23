const webpack = require('webpack'); //访问 webpack 运行时(runtime)
  const configuration = require('./11webpack.config.js');

  let compiler = webpack(configuration);
  compiler.apply(new webpack.ProgressPlugin());

  compiler.run(function(err, stats) {
    // console.log(stats);
    // ...
  });