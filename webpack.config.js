const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './public/song.js',
    output: {
        path: path.resolve(__dirname, 'public', 'build'),
        filename: 'song.js',
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        })
    ]
};