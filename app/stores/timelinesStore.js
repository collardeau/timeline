const objectAssign = require('react/lib/Object.assign');
const EventEmitter = require('events').EventEmitter;
let AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');
let firebaseUtils = require('../utils/firebaseUtils');

let _store = {
  timelines: [],
  privateTimelines: []
};

const CHANGE_EVENT = 'change';

let timelineStore = objectAssign({}, EventEmitter.prototype, {

  changeTimelines(timelines){
    _store.timelines = timelines;
  },

  changePrivateTimelines(timelines){
    _store.privateTimelines = timelines;
  },

  getTimelines( timelineType = "public"){
    if (timelineType === "user") {
      return _store.privateTimelines;
    }else{
      return _store.timelines;
    }
  },

  addTimeline(timeline){
    _store.timelines.push(timeline);
  },

  addChangeListener(cb) { this.on(CHANGE_EVENT, cb); },

  removeChangeListener(cb) { this.removeListener(CHANGE_EVENT, cb); }

});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case appConstants.CHANGE_TIMELINES:
          timelineStore.changeTimelines(action.data.timelines);
          timelineStore.emit(CHANGE_EVENT);
          break;
        case appConstants.CHANGE_PRIVATE_TIMELINES:
          timelineStore.changePrivateTimelines(action.data.timelines);
          timelineStore.emit(CHANGE_EVENT);
          break;
       case appConstants.ADD_TIMELINE:
          timelineStore.addTimeline(action.data.timeline);
          // timelineStore.emit(CHANGE_EVENT);
          // we are going jumping to a new route anyway;
          break;
       default:
            return true;
    }
});

module.exports = timelineStore;

