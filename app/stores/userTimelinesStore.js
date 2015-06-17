const objectAssign = require('react/lib/Object.assign');
const EventEmitter = require('events').EventEmitter;
let AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');

// user timelines index store
let _store = { timelines: [] };

const CHANGE_EVENT = 'change';

let userTimelinesStore = objectAssign({}, EventEmitter.prototype, {

  changeTimelines(timelines){ _store.timelines = timelines; },

  getTimelines(){ return _store.timelines; },

  // addTimeline(timeline, timelineId ) { _store.timelines.push(timeline); },

  addChangeListener(cb) { this.on(CHANGE_EVENT, cb); },
  removeChangeListener(cb) { this.removeListener(CHANGE_EVENT, cb); }

});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.CHANGE_USER_TIMELINES:
      userTimelinesStore.changeTimelines(action.data.timelines);
      userTimelinesStore.emit(CHANGE_EVENT);
      break;
      //    case appConstants.ADD_TIMELINE:
      //       userTimelinesStore.addTimeline(action.data.timeline, action.data.timelineId);
      //       userTimelinesStore.emit(CHANGE_EVENT);
      //       break;
      default:
        return true;
  }
});

module.exports = userTimelinesStore;

