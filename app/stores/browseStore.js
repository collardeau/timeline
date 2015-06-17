const objectAssign = require('react/lib/Object.assign');
const EventEmitter = require('events').EventEmitter;
let AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');
let firebaseUtils = require('../utils/firebaseUtils');

let publicTimelineStore = require('./publicTimelinesStore');
let userTimelineStore = require('./userTimelinesStore');
let bookmarkTimelineStore = require('./bookmarkTimelinesStore');

let _store = {
  timelines: [],
  active: 'public'
};

const CHANGE_EVENT = 'change';

let doSomething = function() {
  console.log("one store listens to another !  craziness! ");
  if(_store.active === 'public'){
    _store.timelines = publicTimelineStore.getTimelines();
    browseStore.emit(CHANGE_EVENT);
  }
};

publicTimelineStore.addChangeListener(doSomething);

let browseStore = objectAssign({}, EventEmitter.prototype, {

  changeTimelines(data){

    let filter = data.filter;
    let newStore = publicTimelineStore;

    if (filter === 'user') { newStore = userTimelineStore; }
    if (filter === 'bookmarks') { newStore = bookmarkTimelineStore; }
    _store.timelines = newStore.getTimelines();

  },

  getTimelines(){ return _store.timelines; },

  changeActive(active) { _store.active = active; },
  getActive() { return _store.active; },

  addTimeline(timeline, timelineId ){ // always push to private tl?
    _store.timelines.push(timeline);
    _store.newestAdded = timelineId;
  },

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
   case appConstants.ADD_TIMELINE:
      browseStore.addTimeline(action.data.timeline, action.data.timelineId);
      browseStore.emit(CHANGE_EVENT);
      break;
    case appConstants.LOGOUT_USER:
      browseStore.emptyUserData();
      browseStore.emit(CHANGE_EVENT);
      break;
    default:
        return true;
  }
});

module.exports = browseStore;

