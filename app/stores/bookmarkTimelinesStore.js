const objectAssign = require('react/lib/Object.assign');
const EventEmitter = require('events').EventEmitter;
let AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');

let _store = { timelines: [] };

const CHANGE_EVENT = 'change';

let bookmarkTimelinesStore = objectAssign({}, EventEmitter.prototype, {

  changeTimelines(timelines){ _store.timelines = timelines; },
  getTimelines(){ return _store.timelines; },

  // addTimeline(timeline, timelineId ) { _store.timelines.push(timeline); },

  addChangeListener(cb) { this.on(CHANGE_EVENT, cb); },
  removeChangeListener(cb) { this.removeListener(CHANGE_EVENT, cb); }

});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.CHANGE_BOOKMARK_TIMELINES:
      bookmarkTimelinesStore.changeTimelines(action.data.timelines);
      bookmarkTimelinesStore.emit(CHANGE_EVENT);
      break;
      //   case appConstants.ADD_TIMELINE:
      //      bookmarkTimelinesStore.addTimeline(action.data.timeline, action.data.timelineId);
      //      bookmarkTimelinesStore.emit(CHANGE_EVENT);
      //      break;
      default:
        return true;
  }
});

module.exports = bookmarkTimelinesStore;

