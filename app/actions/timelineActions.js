let AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');

let timelineActions = {

    changeTimeline(tl) {

        console.log("we are in an action");

        AppDispatcher.handleAction({
            actionType: appConstants.CHANGE_TIMELINE,
            data: {
                timeline: tl
            }
        });
    }

};

module.exports = timelineActions;
