const path = require('path');
const webpack = require('webpack');

const styleLoader = {
    loader: 'style-loader',
    options: {
        sourceMap: true
    }
};
const cssLoader = {
    loader: 'css-loader',
    options: {
        sourceMap: true
    }
};

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
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
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
    ],
    devtool: 'inline-source-map'
};