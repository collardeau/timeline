let AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');
let svgUtils = require('../utils/svgUtils');
let firebaseUtils = require('../utils/firebaseUtils');

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

  syncTimelines(uid){
    firebaseUtils.changeTimelines(uid, timelines => {
      AppDispatcher.handleAction({
        actionType: appConstants.CHANGE_TIMELINES,
        data: {
          timelines: timelines
        }
      });
    });
  },

  killTimelines(){
    console.log('timeline action: killTimelines !');
    firebaseUtils.killTimelines();
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

  emptyUserData(){
    console.log('timeline action: empty user data');
    AppDispatcher.handleAction({
      actionType: appConstants.EMPTY_USER_DATA
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
    svgUtils.addDot(dot);
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
  },

  toggleDates(){
    svgUtils.toggleDates();
  }

};

module.exports = timelineActions;
