const $ = require('jquery');
const SongApp = require('./SongApp');

$(document).ready(function() {
    var songApp = new SongApp($('.container'));
});