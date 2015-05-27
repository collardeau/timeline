let AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');

let timelineActions = {

  addTimeline(timeline){
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_TIMELINE,
      data: {
        timeline: timeline
      }
    });
  },

    changeTimeline(tl) {

        AppDispatcher.handleAction({
            actionType: appConstants.CHANGE_TIMELINE,
            data: {
                timeline: tl
            }
        });
    }

};

module.exports = timelineActions;
