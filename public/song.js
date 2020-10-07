const $ = require('jquery');
require('bootstrap/dist/css/bootstrap.css');
require('./style.css');
const SongApp = require('./SongApp');

$(document).ready(function() {
    var songApp = new SongApp($('.container'));
});