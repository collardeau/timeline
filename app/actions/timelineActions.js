let AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');
let firebaseUtils = require('../utils/firebaseUtils');

//todo separate svgActions

let timelineActions = {

  syncPublicTimelines(){
    firebaseUtils.changePublicTimelines(timelines => {
      AppDispatcher.handleAction({
        actionType: appConstants.CHANGE_PUBLIC_TIMELINES,
        data: {
          timelines: timelines
        }
      });
    });
  },

  addTimeline(timeline){
    firebaseUtils.addTimeline(timeline, timelineId => {
      AppDispatcher.handleAction({
        actionType: appConstants.ADD_TIMELINE,
        data: {
          timeline: timeline,
          timelineId: timelineId
        }
      });
    });
  },

  loadTimeline(timelineId, owner){
    firebaseUtils.loadTimeline(timelineId, owner, timeline => {
      AppDispatcher.handleAction({
        actionType: appConstants.LOAD_TIMELINE,
        data: {
          timeline: timeline
        }
      });
    });
  },


  deleteTimeline(timelineId, timelineOwner){
    firebaseUtils.deleteTimeline(timelineId, timelineOwner);
  },

  editTimeline(timeline, timelineId) {
    AppDispatcher.handleAction({ // need dispatcher here or is firebase pushing changes?
      actionType: appConstants.EDIT_TIMELINE,
      data: {
        timeline: timeline
      }
    });
    firebaseUtils.editTimeline(timeline, timelineId);
  },

  addDot(dot, timelineId, timelineOwner){
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_DOT
    });
    firebaseUtils.addDot(dot, timelineId, timelineOwner);
  },

  deleteDot(dotRef, timelineId, timelineOwner){
    AppDispatcher.handleAction({
      actionType: appConstants.DELETE_DOT,
      data: {
        dotRef: dotRef,
        timelineId: timelineId
      }
    });
    firebaseUtils.removeDot(dotRef, timelineId, timelineOwner);
  }

};

module.exports = timelineActions;
