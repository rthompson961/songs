import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './style.css'
import SongApp from './SongApp';

$(document).ready(function() {
    var songApp = new SongApp($('.container'));
});