const objectAssign = require('react/lib/Object.assign');
const EventEmitter = require('events').EventEmitter;
let AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');
let firebaseUtils = require('../utils/firebaseUtils');

let emptyTimeline = {
  name: "", description: "", owner: "", ownerName: "",
  isPublic: false,
  dots: []
};

let _store = {
  timeline: emptyTimeline,
  bmCount: 0,
  isBookmarked: false
};

const CHANGE_EVENT = 'change';
const SVG_EVENT = 'svg';  // will reset the svg
const BM_EVENT = 'bookmark';

let timelineStore = objectAssign({}, EventEmitter.prototype, {

  loadTimeline(timeline){ _store.timeline = timeline; },

  getTimeline() { return _store.timeline; },

  emptyTimeline() { _store.timeline = emptyTimeline; },

  changeTimelineBm(count){ _store.bmCount = count; },

  getTimelineBm() { return _store.bmCount; },

  changeBookmark(status) { _store.isBookmarked = status; },

  isBookmarked() { return _store.isBookmarked; },

  editTimeline(data){
    // could check first what actually changed?
    _store.timeline.name = data.timeline.name;
    _store.timeline.description = data.timeline.description;
    _store.timeline.isPublic = data.timeline.isPublic;
  },

  getDotIndex(dotRef){
    let i = 0,
        dots = _store.timeline.dots;
    while(i < dots.length) {
      if(dots[i].key === dotRef){
        return i;
      }
      i++;
    }
  },

  deleteDot(data){
    let toDeleteIndex = this.getDotIndex(data.dotRef);
    _store.timeline.dots.splice(toDeleteIndex, 1);
  },

  addChangeListener(cb) { this.on(CHANGE_EVENT, cb); },
  addSVGListener(cb) { this.on(SVG_EVENT, cb); },

  removeChangeListener(cb) { this.removeListener(CHANGE_EVENT, cb); },
  removeSVGListener(cb) { this.removeListener(SVG_EVENT, cb); }

});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
      case appConstants.LOAD_TIMELINE:
        timelineStore.loadTimeline(action.data.timeline);
        timelineStore.emit(CHANGE_EVENT);
        break;
      case appConstants.KILL_TL_SYNC:
        timelineStore.emptyTimeline();
        timelineStore.emit(CHANGE_EVENT);
        break;
     case appConstants.TOGGLE_TIMELINE_BOOKMARK:
        timelineStore.changeBookmark(action.data);
        timelineStore.emit(CHANGE_EVENT);
        break;
      case appConstants.EDIT_TIMELINE:
        timelineStore.editTimeline(action.data);
        timelineStore.emit(CHANGE_EVENT);
        break;
      case appConstants.ADD_DOT:
        //svgutils already updated store array
        timelineStore.emit(CHANGE_EVENT);
        break;
      case appConstants.DELETE_DOT:
        timelineStore.deleteDot(action.data);
        timelineStore.emit(SVG_EVENT);
        break;
      default:
        return true;
    }
});

module.exports = timelineStore;

