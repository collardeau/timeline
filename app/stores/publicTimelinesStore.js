const objectAssign = require('react/lib/Object.assign');
const EventEmitter = require('events').EventEmitter;
let AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');

// public timelines index store
let _store = { timelines: [] };

const CHANGE_EVENT = 'change';

let publicTimelinesStore = objectAssign({}, EventEmitter.prototype, {

  changeTimelines(timelines){ _store.timelines = timelines; },
  getTimelines(){ return _store.timelines; },

  // addTimeline(timeline, timelineId ) { _store.timelines.push(timeline); },

  addChangeListener(cb) { this.on(CHANGE_EVENT, cb); },
  removeChangeListener(cb) { this.removeListener(CHANGE_EVENT, cb); }

});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.CHANGE_PUBLIC_TIMELINES:
      publicTimelinesStore.changeTimelines(action.data.timelines);
      publicTimelinesStore.emit(CHANGE_EVENT);
      break;
      //   case appConstants.ADD_TIMELINE:
      //      publicTimelinesStore.addTimeline(action.data.timeline, action.data.timelineId);
      //      publicTimelinesStore.emit(CHANGE_EVENT);
      //      break;
      default:
        return true;
  }
});

module.exports = publicTimelinesStore;

