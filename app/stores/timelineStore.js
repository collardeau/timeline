const objectAssign = require('react/lib/Object.assign');
const EventEmitter = require('events').EventEmitter;
let AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');
let firebaseUtils = require('../utils/firebaseUtils');

let _store = {
  timelines: [],
  timeline: null  // timeline on display
};

const CHANGE_EVENT = 'change';
const SVG_EVENT = 'svg';  // will reset the svg

let timelineStore = objectAssign({}, EventEmitter.prototype, {

  // dealing with browse page

  changeTimelines(timelines){
    _store.timelines = timelines;
  },

  getTimelines( timelineType = "public"){
    if (timelineType === "public") {
      return _store.timelines.filter((tl) => {
        if(tl.isPublic) { return tl; }
      });
    } else if (timelineType === "user") {
      return _store.timelines.filter((tl) => {
        if(!tl.isPublic){ return tl; }  // shortcut
      });
    }
  },

  addTimeline(timeline){
    _store.timelines.push(timeline);
  },

  //dealing with timeline page

  loadTimeline(timeline){
    _store.timeline = timeline;
  },

 getTimeline() {
    return _store.timeline;
  },

  editTimeline(data){
    console.log(data);
    _store.timeline.name = data.timeline.name;
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
        case appConstants.CHANGE_TIMELINES:
          timelineStore.changeTimelines(action.data.timelines);
          timelineStore.emit(CHANGE_EVENT);
          break;
       case appConstants.ADD_TIMELINE:
          timelineStore.addTimeline(action.data.timeline);
          // timelineStore.emit(CHANGE_EVENT);
          // we are going jumping to a new route anyway;
          break;
        case appConstants.LOAD_TIMELINE:
          timelineStore.loadTimeline(action.data.timeline);
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

