const objectAssign = require('react/lib/Object.assign');
const EventEmitter = require('events').EventEmitter;
let AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');

let publicTimelineStore = require('./publicTimelinesStore');
let userTimelineStore = require('./userTimelinesStore');
let bookmarkTimelineStore = require('./bookmarkTimelinesStore');

const CHANGE_EVENT = 'change';

let _store = { timelines: [], active: 'public' };

let browseStore = objectAssign({}, EventEmitter.prototype, {

  changeTimelines(filter){
    let store = publicTimelineStore;
    if(filter === 'bookmarks'){ store = bookmarkTimelineStore; }
    if(filter === 'user'){ store = userTimelineStore; }
    _store = {
      timelines: store.getTimelines(),
      active: filter
    };
  },

  getTimelines(){ return _store.timelines; },

  changeActive(active) { _store.active = active; },
  getActive() { return _store.active; },

    // addTimeline(timeline, timelineId ){
    //   _store.timelines.push(timeline);
    //   _store.newestAdded = timelineId;
    // },

  addChangeListener(cb) { this.on(CHANGE_EVENT, cb); },
  removeChangeListener(cb) { this.removeListener(CHANGE_EVENT, cb); }

});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
   case appConstants.CHANGE_TIMELINES:
      browseStore.changeTimelines(action.data);
      browseStore.emit(CHANGE_EVENT);
      break;
      //   case appConstants.ADD_TIMELINE:
      //       browseStore.addTimeline(action.data.timeline, action.data.timelineId);
      //       browseStore.emit(CHANGE_EVENT);
      //       break;
      //     case appConstants.LOGOUT_USER:
      //       browseStore.emptyUserData();
      //       browseStore.emit(CHANGE_EVENT);
      //       break;
    default:
        return true;
  }
});

module.exports = browseStore;

