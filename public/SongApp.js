'use strict';

import Vote from './SongVote';
import $ from 'jquery';

class SongApp {
    constructor($wrapper) {
        const vote = new Vote($wrapper);
    }
}

export default SongApp;