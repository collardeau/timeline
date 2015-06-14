const objectAssign = require('react/lib/Object.assign');
const EventEmitter = require('events').EventEmitter;
let AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');
let firebaseUtils = require('../utils/firebaseUtils');

let _store = {
  timelines: [],
  publicTimelines: [],
  newestAdded: ''
};

const CHANGE_EVENT = 'change';
const NEW_EVENT = 'new';

let timelineStore = objectAssign({}, EventEmitter.prototype, {

  changeTimelines(timelines){ _store.timelines = timelines; },

  changePublicTimelines(timelines){ _store.publicTimelines = timelines; },

  emptyUserData(){
    console.log("timelinesStore: emptying user data");
    _store.timelines = [];
  },

  getTimelines( timelineType = "public"){
    if (timelineType === "user") {
      return _store.timelines;
    }else{
      return _store.publicTimelines;
    }
  },

  getNewest() { return _store.newestAdded; },

  addTimeline(timeline, timelineId ){ // always push to private tl?
    _store.timelines.push(timeline);
    _store.newestAdded = timelineId;
  },

  addChangeListener(cb) { this.on(CHANGE_EVENT, cb); },
  removeChangeListener(cb) { this.removeListener(CHANGE_EVENT, cb); },

  addNewListener(cb) { this.on(NEW_EVENT, cb); },
  removeNewListener(cb) { this.removeListener(NEW_EVENT, cb); }

});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.CHANGE_PUBLIC_TIMELINES:
      timelineStore.changePublicTimelines(action.data.timelines);
      timelineStore.emit(CHANGE_EVENT);
      break;
    case appConstants.CHANGE_TIMELINES:
      timelineStore.changeTimelines(action.data.timelines);
      timelineStore.emit(CHANGE_EVENT);
      break;
    case appConstants.ADD_TIMELINE:
      timelineStore.addTimeline(action.data.timeline, action.data.timelineId);
      timelineStore.emit(NEW_EVENT);
      break;
    case appConstants.LOGOUT_USER:
      timelineStore.emptyUserData();
      timelineStore.emit(CHANGE_EVENT);
      break;
    default:
        return true;
  }
});

module.exports = timelineStore;

