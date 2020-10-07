'use strict';

const Vote = require('./SongVote');
const $ = require('jquery');

class SongApp {
    constructor($wrapper) {
        const vote = new Vote($wrapper);
    }
}

module.exports = SongApp;