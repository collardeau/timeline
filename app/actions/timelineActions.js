let AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');
let svgUtils = require('../utils/svgUtils');
let firebaseUtils = require('../utils/firebaseUtils');

let timelineActions = {

  changeTimelines(){
    firebaseUtils.changeTimelines(function(timelines){
      AppDispatcher.handleAction({
        actionType: appConstants.CHANGE_TIMELINES,
        data: {
          timelines: timelines
        }
      });
    });
  },

  loadTimeline(timelineId){
    firebaseUtils.loadTimeline(timelineId, function(timeline){
      AppDispatcher.handleAction({
        actionType: appConstants.LOAD_TIMELINE,
          data: {
            timeline: timeline
          }
        });
    });
  },

  addTimeline(timeline){
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_TIMELINE,
      data: {
        timeline: timeline
      }
    });
    firebaseUtils.addTimeline(timeline);
  },

  editTimeline(newTimeline, timelineId) {
    AppDispatcher.handleAction({
      actionType: appConstants.EDIT_TIMELINE,
      data: {
        timelineId: timelineId,
        timeline: newTimeline
      }
    });
    firebaseUtils.editTimeline(newTimeline, timelineId);
  },

  addDot(dot, timelineId){
    svgUtils.addDot(dot);
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_DOT
    });
    firebaseUtils.addDot(dot, timelineId);
  },

  deleteDot(dotRef, timelineId){
    AppDispatcher.handleAction({
      actionType: appConstants.DELETE_DOT,
      data: {
        dotRef: dotRef,
        timelineId: timelineId
      }
    });
    firebaseUtils.removeDot(dotRef, timelineId);
    // svg dot util too, or just draw svg
    // svg.reset();
  },

  toggleDates(){
    svgUtils.toggleDates();
  }

};

module.exports = timelineActions;
