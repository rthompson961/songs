const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './public/song.js',
    output: {
        path: path.resolve(__dirname, 'public', 'build'),
        filename: 'song.js',
        publicPath: '/build/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        })
    ]
};