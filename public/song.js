const $ = require('jquery');
require('./style.css');
const SongApp = require('./SongApp');

$(document).ready(function() {
    var songApp = new SongApp($('.container'));
});