/**
 * Created by Thomas on 5/9/15.
 */

const objectAssign = require('react/lib/Object.assign');
const EventEmitter = require('events').EventEmitter;

let moment = require('moment');

// init some data, could be a store
let date1 = moment("1977-03-26").unix();
let date2 = moment().unix();

let _store = {

    dots: [
        {
            event: "Born",
            timestamp: date1,
            location: "Paris"
        },
        {
            event: "Moved to Berlin",
            timestamp: date2,
            location: "Berlin"
        }
    ]
};

let timelineStore = objectAssign({}, EventEmitter.prototype, {

    getDots() { return _store.dots; },

    addDot(dot) {
        _store.dots.push(dot);
    }

});

module.exports = timelineStore;
