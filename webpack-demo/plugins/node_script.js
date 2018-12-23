import webpack from 'webpack' //访问 webpack 运行时(runtime)
import configuration from './webpack.config'

  let compiler = webpack(configuration);
  compiler.apply(new webpack.ProgressPlugin());

  compiler.run(function(err, stats) {
    // console.log(stats);
    // ...
  });