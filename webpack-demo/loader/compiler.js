
import path from 'path';
import webpack from 'webpack';
import memoryfs from 'memory-fs';

export default (fixture, options = {}) => {
    const compiler = webpack({
        context: __dirname,
        entry: `./js/example.txt`,
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                test: /\.txt$/,
                use: {
                    loader: path.resolve(__dirname, './loader.js'),
                    options: {name: 'Alex'}
                }
            }]
        }
    });

    compiler.outputFileSystem = new memoryfs();

    return new Promise((resolve, reject) => {
        compiler.run((err,stats) => {
            console.log(err, stats);
            if(err) reject(err);
            resolve(stats)
        })
    })

    // compiler.apply(new webpack.ProgressPlugin());
    // compiler.run((err,stats) => {
    //     console.log(err, stats);
    //     if(err) reject(err);
    //     // resolve(stats)
    // })
}
