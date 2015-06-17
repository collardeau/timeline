let AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');
let firebaseUtils = require('../utils/firebaseUtils');

let browseActions = {

  syncTimelines(auth){ console.log('browse actions: sync all timelines');

    firebaseUtils.changePublicTimelines(timelines => {
      console.log('browse action cb: sync public timlines');
      AppDispatcher.handleAction({
        actionType: appConstants.CHANGE_PUBLIC_TIMELINES,
        data: { timelines: timelines }
      });
    });

    if(auth){

      let uid = auth.uid;

      firebaseUtils.changeTimelines(uid, timelines => {
        console.log('browse action cb: sync private timelines');
        AppDispatcher.handleAction({
          actionType: appConstants.CHANGE_USER_TIMELINES,
          data: { timelines: timelines }
        });
        this.changeTimelines('public');

      });

      firebaseUtils.changeBookmarks(uid, timelines => {
        console.log('browse action cb: sync bookmarked timelines');
        AppDispatcher.handleAction({
          actionType: appConstants.CHANGE_BOOKMARKS,
          data: { timelines: timelines }
        });
      });
    }
  },

  changeTimelines(filter) {
    AppDispatcher.handleAction({
      actionType: appConstants.CHANGE_TIMELINES,
      data: filter
    });
  }

  // addTimeline(timeline){
  //   firebaseUtils.addTimeline(timeline, timelineId => {
  //     AppDispatcher.handleAction({
  //       actionType: appConstants.ADD_TIMELINE,
  //       data: {
  //         timeline: timeline,
  //         timelineId: timelineId
  //       }
  //     });
  //   });
  // }

};

module.exports = browseActions;
