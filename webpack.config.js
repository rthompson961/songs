const path = require('path');

module.exports = {
    mode: 'development',
    entry: './public/song.js',
    output: {
        path: path.resolve(__dirname, 'public', 'build'),
        filename: 'song.js',
    }
};