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
            event: "Born in Paris",
            timestamp: moment("1977-03-26").unix(),
            location: "Paris"
        },
        {
            event: "Now",
            timestamp: moment().unix(),
            location: "Berlin"
        },
        {
            event: "NY",
            timestamp: moment("2000-01-01").unix(),
            location: "New York"
        },
        {
            event: "Barcelona",
            timestamp: moment("2014-02-01").unix(),
            location: "Villefranche"
        },
        {
            event: "South of France",
            timestamp: moment("1985-08-01").unix(),
            location: "Villefranche"
        },
        {
            event: "London",
            timestamp: moment("1989-12-25").unix(),
            location: "Villefranche"
        },
        {
            event: "Florida",
            timestamp: moment("1991-07-25").unix(),
            location: "Villefranche"
        },
        {
            event: "Boston",
            timestamp: moment("1995-09-01").unix(),
            location: "Villefranche"
        },
        {
            event: "Amsterdam",
            timestamp: moment("2010-09-01").unix(),
            location: "Villefranche"
        },
        {
            event: "Prague",
            timestamp: moment("2014-08-01").unix(),
            location: "Villefranche"
        },
        {
            event: "Back to Europe",
            timestamp: moment("2008-04-10").unix(),
            location: "London"
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
