let AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');

let timelineActions = {

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
