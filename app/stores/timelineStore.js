const objectAssign = require('react/lib/Object.assign');
const EventEmitter = require('events').EventEmitter;
let AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');
let mockupUtils = require('../utils/mockupUtils');

let _store = {
  timelines: [{
    name: "Painters",
    id: "painters",
    isPublic: true,
    owner: "simplelogin:1" // uid
  }, {
    name: "Tonton",
    id: "tonton",
    isPublic: true,
    owner: "simplelogin:1"
  }, {
    name: "Pearl Jam",
    id: "pj",
    isPublic: false,
    owner: "simplelogin:1"
  }, {
    name: "Ghost",
    id: "doesnt exist",
    isPublic: true,
    owner: "stranger"
  }, {
    name: "new",
    id: "new",
    isPublic: true,
    owner: "simplelogin:1"
  }]
};

const CHANGE_EVENT = 'change';

let timelineStore = objectAssign({}, EventEmitter.prototype, {

  getTimelines() {
    // should be server-side
    let timelines = _store.timelines;
    let filteredTimelines = timelines.filter((tl) => {
      if(tl.isPublic){
        return tl;
      }
    });
    return filteredTimelines;
  },

  getTimeline(timeline) {
    console.log("fectching this timeline: ", timeline);
    let newTimeline = mockupUtils[timeline];
    if (newTimeline){
      return newTimeline;
    } else {
      console.log("no such timeline exists");
      return mockupUtils.pj;  // temp
    }
  },

  addTimeline(timeline){
    console.log("adding a timeline from the store");
    _store.timelines.push({
      name: timeline.name,
      id: "tonton"  // temp
    });
  },

  getDots() { return _store.timeline.dots; },

  addDot(dot) {
    _store.dots.push(dot);
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
        case appConstants.ADD_TIMELINE:
          timelineStore.addTimeline(action.data.timeline);
          //timelineStore.emit(CHANGE_EVENT);
          break;

        default:
            return true;
    }
});

module.exports = timelineStore;

