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

  addTimeline(timeline){
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_TIMELINE,
      data: {
        timeline: timeline
      }
    });
    firebaseUtils.addTimeline(timeline);
  },

  getTimelines(){
    firebaseUtils.getTimelines(function(timelines){
      AppDispatcher.handleAction({
        actionType: appConstants.GET_TIMELINES,
        data: {
          timelines: timelines
        }
      });
    });
  },

  getOwnTimelines() {
    AppDispatcher.handleAction({
      actionType: appConstants.GET_OWN_TIMELINES
    });
  },

  getPublicTimelines() {
    AppDispatcher.handleAction({
      actionType: appConstants.GET_PUBLIC_TIMELINES
    });
  },

  addDot(dot){
    svgUtils.addDot(dot);
  },

  toggleDates(){
    svgUtils.toggleDates();
  }

};

module.exports = timelineActions;
