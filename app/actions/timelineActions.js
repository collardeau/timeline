let AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');
let firebaseUtils = require('../utils/firebaseUtils');
let bmActions = require('../actions/bmActions.js');

let timelineActions = {

  loadTimeline(tlId, owner){ console.log('tl action: sync timeline data');

    firebaseUtils.loadTimeline(tlId, owner, timeline => {
      AppDispatcher.handleAction({
        actionType: appConstants.LOAD_TIMELINE,
        data: {
          timeline: timeline
        }
      });
    });

    // console.log('tl action (in load/sync timeline): also syncBmCount');
    // firebaseUtils.changeBmCount(tlId, count => {
    //   AppDispatcher.handleAction({
    //     actionType: appConstants.CHANGE_TIMELINE_BM,
    //     data: {
    //       count: count,
    //       tlId: tlId
    //     }
    //   });
    // });

  },

  killTimeline(tlId){ console.log('tl action: kill timelines sync');
    // firebaseUtils.killTimelineSync(tlId);
    AppDispatcher.handleAction({
      actionType: appConstants.KILL_TIMELINE
    });
  },


  bookmarkTimeline(toBookmark, timeline, timelineId, user) {
    AppDispatcher.handleAction({
      actionType: appConstants.TOGGLE_TIMELINE_BOOKMARK,
      data: toBookmark
    });
    firebaseUtils.bookmarkTimeline(toBookmark, timeline, timelineId, user);

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
