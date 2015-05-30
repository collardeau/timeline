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

  addDot(dot, timelineId){
    svgUtils.addDot(dot);
    // no dispatching as nothing in React component needs updating
    firebaseUtils.addDot(dot, timelineId);
  },

  toggleDates(){
    svgUtils.toggleDates();
  }

};

module.exports = timelineActions;
