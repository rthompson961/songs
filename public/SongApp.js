'use strict';

const Vote = require('./SongVote');

(function(window, $) {
    class SongApp {
        constructor($wrapper) {
            const vote = new Vote($wrapper);           
        } 
    }

    window.SongApp = SongApp;
})(window, jQuery);