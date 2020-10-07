const $ = require('jquery');
require('bootstrap/dist/css/bootstrap.css');
require('@fortawesome/fontawesome-free/css/all.css');
require('@fortawesome/fontawesome-free/js/all.js');
require('./style.css');
const SongApp = require('./SongApp');

$(document).ready(function() {
    var songApp = new SongApp($('.container'));
});