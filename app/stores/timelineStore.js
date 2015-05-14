/**
 * Created by Thomas on 5/9/15.
 */

const objectAssign = require('react/lib/Object.assign');
const EventEmitter = require('events').EventEmitter;
let AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');

let moment = require('moment');
let pj = [
    {
        event: "Hartford 1996",
        timestamp: moment("1996-10-02").unix()
    },
    {
        event: "NJ 98",
        timestamp: moment("1998-09-08").unix()
    },
    {
        event: "MSG2",
        timestamp: moment("1998-09-10").unix()
    },
    {
        event: "Hartford 98",
        timestamp: moment("1998-09-13").unix()
    },
    {
        event: "Boston 1",
        timestamp: moment("2000-08-29").unix()
    },
    {
        event: "Boston 2",
        timestamp: moment("2000-08-30").unix()
    },
    {
        event: "Jones Beach 1",
        timestamp: moment("2000-08-23").unix()
    },
    {
        event: "Jones Beach 2",
        timestamp: moment("2000-08-24").unix(),
        location: "USA"
    },
    {
        event: "Jones Beach 3",
        timestamp: moment("2000-08-25").unix()
    },
    {
        event: "Birmingham",
        timestamp: moment("2003-04-09").unix()
    },
    {
        event: "Philly",
        timestamp: moment("2003-04-28").unix()
    },
    {
        event: "Uniondale",
        timestamp: moment("2003-04-30").unix()
    },
    {
        event: "NY1",
        timestamp: moment("2003-07-08").unix()
    },
    {
        event: "NY2",
        timestamp: moment("2003-07-09").unix()
    },
    {
        event: "Boston",
        timestamp: moment("2003-07-03").unix()
    },
    {
        event: "Hershey",
        timestamp: moment("2003-07-12").unix()
    },
    {
        event: "Boston 2",
        timestamp: moment("2004-09-29").unix(),
        location: "All over"
    },
    {
        event: "Kissimmee",
        timestamp: moment("2004-10-08").unix()
    },
    {
        event: "Borgata 2",
        timestamp: moment("2005-10-01").unix()
    },
    {
        event: "Philly",
        timestamp: moment("2005-10-03").unix()
    },
    {
        event: "Hartford",
        timestamp: moment("2006-05-13").unix()
    },
    {
        event: "NJ2",
        timestamp: moment("2006-05-28").unix()
    },
    {
        event: "MSG1",
        timestamp: moment("2010-05-20").unix(),
        location: "All over"
    },
    {
        event: "MSG2",
        timestamp: moment("2010-05-21").unix()
    },
    {
        event: "Copenhagen",
        timestamp: moment("2012-07-10").unix()
    },
    {
        event: "Amsterdam 1",
        timestamp: moment("2012-06-26").unix()
    },
    {
        event: "Amsterdam 2",
        timestamp: moment("2012-06-27").unix()
    },
    {
        event: "Amsterdam 1",
        timestamp: moment("2014-06-16").unix()
    },
    {
        event: "Amsterdam 2",
        timestamp: moment("2014-06-17").unix()
    },
    {
        event: "Berlin 1",
        timestamp: moment("2012-07-04").unix()
    },
    {
        event: "Berlin 2",
        timestamp: moment("2012-07-05").unix()
    },
    {
        event: "Berlin",
        timestamp: moment("2014-06-26").unix()
    },
    {
        event: "Vienna",
        timestamp: moment("2014-06-25").unix()
    }
];
let tonton = [
    {
        event: "Berlin",
        timestamp: moment("2015-04-17").unix()
    },
    {
        event: "NY",
        timestamp: moment("2000-01-01").unix()
    },
    {
        event: "Born in Paris",
        timestamp: moment("1977-03-26").unix()
    },
    {
        event: "Barcelona",
        timestamp: moment("2014-02-01").unix()
    },
    {
        event: "London",
        timestamp: moment("1989-12-25").unix()
    },
    {
        event: "Miami",
        timestamp: moment("1991-07-25").unix()
    },
    {
        event: "Montverde",
        timestamp: moment("1993-09-01").unix()
    },
    {
        event: "Boston U",
        timestamp: moment("1995-09-01").unix()
    },
    {
        event: "Villefranche",
        timestamp: moment("1985-08-01").unix()
    },
    {
        event: "Amsterdam",
        timestamp: moment("2010-09-01").unix()
    },
    {
        event: "Prague",
        timestamp: moment("2014-08-01").unix()
    },
    {
        event: "Madrid",
        timestamp: moment("2009-01-01").unix()
    },
    {
        event: "Lisbon",
        timestamp: moment("2009-03-01").unix()
    }
];
let nina = [
    {
        event: "Born in Paris",
        timestamp: moment("1975-03-19").unix()
    },
    //{
    //    event: "London",
    //    timestamp: moment("1989-12-20").unix()
    //},
    {
        event: "Married",
        timestamp: moment("2012-04-14").unix()
    },
    //{
    //    event: "Miami",
    //    timestamp: moment("1991-06-01").unix()
    //},
    //{
    //    event: "New York?",
    //    timestamp: moment("1998-06-01").unix()
    //},
    {
        event: "now",
        timestamp: moment().unix()
    },
];
let painting = [
    {
        event: "Picasso",
        timestamp: moment("1881-10-25").unix()
    },
    {
        event: "Monet",
        timestamp: moment("1840-09-14").unix()
    },
    //{
    //    event: "Manet",
    //    timestamp: moment("1832-01-23").unix()
    //},
    //{
    //    event: "Renoir",
    //    timestamp: moment("1841-02-25").unix()
    //},
    {
        event: "Degas",
        timestamp: moment("1834-07-19").unix()
    },
    {
        event: "Dali",
        timestamp: moment("1904-05-11").unix()
    },
    {
        event: "Matisse",
        timestamp: moment("1869-12-31").unix()
    },
    {
        event: "Toulouse-Latrec",
        timestamp: moment("1864-11-24").unix()
    },
    {
        event: "Miro",
        timestamp: moment("1893-04-20").unix()
    },
    {
        event: "Van Gogh",
        timestamp: moment("1853-03-30").unix()
    },
    {
        event: "Pissaro",
        timestamp: moment("1830-07-10").unix()
    },
    {
        event: "Chagall",
        timestamp: moment("1887-07-07").unix()
    }
];
let visa = [
    {
        event: "Sentencing",
        timestamp: moment("2005-07-07").unix()
    },
    {
        event: "JFK pickup",
        timestamp: moment("2003-11-24").unix()
    },
    {
        event: "Fort Dix",
        timestamp: moment("2005-08-22").unix()
    },
    {
        event: "Plea Deal",
        timestamp: moment("2004-08-17").unix()
    },
    {
        event: "Mom flies to Europe",
        timestamp: moment("2006-06-18").unix()
    },
    {
        event: "Time Served",
        timestamp: moment("2008-08-15").unix()
    },
    {
        event: "Loft forfeiture",
        timestamp: moment("2008-02-15").unix()
    },
    {
        event: "w57 apt forfeiture",
        timestamp: moment("2005-03-01").unix()
    },
    {
        event: "175e2 apt forfeiture",
        timestamp: moment("2006-01-25").unix()
    }
];
let geniuses = [
    {
        event: "Galileo",
        timestamp: moment("1564-02-15").unix()
    },
    {
        event: "Newton",
        timestamp: moment("1643-01-04").unix()
    },
    {
        event: "Copernicus",
        timestamp: moment("1473-02-19").unix()
    },
    {
        event: "Kepler",
        timestamp: moment("1571-12-27").unix()
    },
    {
        event: "Da Vinci",
        timestamp: moment("1452-01-15").unix()
    },
    {
        event: "Einstein",
        timestamp: moment("1879-03-14").unix()
    },
    {
        event: "Mozart",
        timestamp: moment("1756-03-14").unix()
    },
    {
        event: "Darwin",
        timestamp: moment("1809-02-12").unix()
    }
    ,
    {
        event: "Edison",
        timestamp: moment("1847-02-11").unix()
    }
];

let _store = {
    dots: painting,
    timeline: {
        name: "Painter's Timeline",
        dots: painting
    }
};

const CHANGE_EVENT = 'change';

let timelineStore = objectAssign({}, EventEmitter.prototype, {

    getTimeline() { return _store.timeline },

    getDots() { return _store.timeline.dots; },

    addDot(dot) {
        _store.dots.push(dot);
    },

    changeTimeline(timeline) {

        console.log("the timeline passed in: ", timeline);

        //  would be a firebase fetch

        let data = null,
            name = ""

        switch (timeline) {
            case "tonton":
                data = tonton;
                name = "Tonton's Timeline";
                break;
            case "geniuses":
                data = geniuses;
                name = "Geniuses Timeline";
                break;
            case "painting":
                data = painting;
                name = "Painters Timeline";
                break;
            case "nina":
                data = nina;
                name = "Alvina's Timeline";
                break;
            case "visa":
                data = visa;
                name = "Visa Timeline";
                break;
            default:
                data = tonton;
                name = "";
        }

        _store.timeline.dots = data;
        _store.timeline.name = name;

    },

    addChangeListener(cb) { this.on(CHANGE_EVENT, cb); },

    removeChangeListener(cb) { this.removeListener(CHANGE_EVENT, cb); }

});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case appConstants.CHANGE_TIMELINE:
            timelineStore.changeTimeline(action.data.timeline);
            timelineStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;
    }
});

module.exports = timelineStore;





