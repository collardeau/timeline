/**
 * Created by Thomas on 5/9/15.
 */

const objectAssign = require('react/lib/Object.assign');
const EventEmitter = require('events').EventEmitter;

let moment = require('moment');

// init some data, could be a store
let pj = [
    {
        event: "Hartford 1996",
        timestamp: moment("1996-10-02").unix(),
        location: "Connecticut"
    },
    {
        event: "NJ 98",
        timestamp: moment("1998-09-08").unix(),
        location: "NJ"
    },
    {
        event: "MSG2",
        timestamp: moment("1998-09-10").unix(),
        location: "NYC"
    },
    {
        event: "Hartford 98",
        timestamp: moment("1998-09-13").unix(),
        location: "Hartford"
    },
    {
        event: "Boston 1",
        timestamp: moment("2000-08-29").unix(),
        location: "USA"
    },
    {
        event: "Boston 2",
        timestamp: moment("2000-08-30").unix(),
        location: "USA"
    },
    {
        event: "Jones Beach 1",
        timestamp: moment("2000-08-23").unix(),
        location: "USA"
    },
    {
        event: "Jones Beach 2",
        timestamp: moment("2000-08-24").unix(),
        location: "USA"
    },
    {
        event: "Jones Beach 3",
        timestamp: moment("2000-08-25").unix(),
        location: "USA"
    },
    {
        event: "2003 Birmingham",
        timestamp: moment("2003-04-09").unix(),
        location: "All over"
    },
    {
        event: "Philly",
        timestamp: moment("2003-04-28").unix(),
        location: "All over"
    },
    {
        event: "Uniondale",
        timestamp: moment("2003-04-30").unix(),
        location: "All over"
    },
    {
        event: "NY1",
        timestamp: moment("2003-07-08").unix(),
        location: "All over"
    },
    {
        event: "NY2",
        timestamp: moment("2003-07-09").unix(),
        location: "All over"
    },
    {
        event: "Boston",
        timestamp: moment("2003-07-03").unix(),
        location: "All over"
    },
    {
        event: "Hershey",
        timestamp: moment("2003-07-12").unix(),
        location: "All over"
    },
    {
        event: "Boston 2",
        timestamp: moment("2004-09-29").unix(),
        location: "All over"
    },
    {
        event: "Kissimmee",
        timestamp: moment("2004-10-08").unix(),
        location: "All over"
    },
    {
        event: "Borgata 2",
        timestamp: moment("2005-10-01").unix(),
        location: "All over"
    },
    {
        event: "Philly",
        timestamp: moment("2005-10-03").unix(),
        location: "All over"
    },
    {
        event: "Hartford",
        timestamp: moment("2006-05-13").unix(),
        location: "All over"
    },
    {
        event: "NJ2",
        timestamp: moment("2006-05-28").unix(),
        location: "All over"
    },
    {
        event: "MSG1",
        timestamp: moment("2010-05-20").unix(),
        location: "All over"
    },
    {
        event: "MSG2",
        timestamp: moment("2010-05-21").unix(),
        location: "All over"
    },
    {
        event: "2012 Tour",
        timestamp: moment("2012-07-01").unix(),
        location: "Villefranche"
    },
    {
        event: "euro 2014",
        timestamp: moment("2014-08-01").unix(),
        location: "Berlin"
    }
];

let tonton = [
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
        event: "Born in Paris",
        timestamp: moment("1977-03-26").unix(),
        location: "Paris"
    },
    {
        event: "Barcelona",
        timestamp: moment("2014-02-01").unix(),
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
        location: "Florida"
    },
    {
        event: "Boston",
        timestamp: moment("1995-09-01").unix(),
        location: "Boston"
    },
    {
        event: "Villefranche",
        timestamp: moment("1985-08-01").unix(),
        location: "Villefranche"
    },
    {
        event: "Amsterdam",
        timestamp: moment("2010-09-01").unix(),
        location: "Amsterdam"
    },
    {
        event: "Prague",
        timestamp: moment("2014-08-01").unix(),
        location: "Prague"
    },
    {
        event: "Back to Europe",
        timestamp: moment("2008-04-10").unix(),
        location: "Europe"
    }
];

let _store = {
    dots: tonton
};

let timelineStore = objectAssign({}, EventEmitter.prototype, {

    getDots() { return _store.dots; },

    addDot(dot) {
        _store.dots.push(dot);
    },

    changeTimeline(timeline) {
        console.log("changing the timeline");
        _store.dots = pj;
    }

});

module.exports = timelineStore;



