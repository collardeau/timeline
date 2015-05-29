let AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');
let svgUtils = require('../utils/svgUtils');

let timelineActions = {

  // ignoring persistence

  addTimeline(timeline){
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_TIMELINE,
      data: {
        timeline: timeline
      }
    });
  },

  getOwnTimelines() {
    AppDispatcher.handleAction({
      actionType: appConstants.GET_OWN_TIMELINES
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
