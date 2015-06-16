let AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');
let firebaseUtils = require('../utils/firebaseUtils');
let bmActions = require('../actions/bmActions.js');

//todo separate svgActions

let timelineActions = {

  syncPublicTimelines(){ console.log('tl action: sync public timlines');
    firebaseUtils.changePublicTimelines(timelines => {
      AppDispatcher.handleAction({
        actionType: appConstants.CHANGE_PUBLIC_TIMELINES,
        data: {
          timelines: timelines
        }
      });
    });
  },

  initUserTimelineData(uid){

    console.log('tl action: initUserData');

    firebaseUtils.changeBookmarks(uid, bTimelines => { console.log('tl action cb: sync bookmarked timelines');
      AppDispatcher.handleAction({
        actionType: appConstants.CHANGE_BOOKMARKS,
        data: { timelines: bTimelines }
      });
    });

    firebaseUtils.changeTimelines(uid, timelines => { console.log('tl action cb: sync private timelines');
      AppDispatcher.handleAction({
        actionType: appConstants.CHANGE_TIMELINES,
        data: { timelines: timelines }
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

  loadTimeline(tlId, owner){ console.log('tl action: sync timeline data');

    firebaseUtils.loadTimeline(tlId, owner, timeline => {
      AppDispatcher.handleAction({
        actionType: appConstants.LOAD_TIMELINE,
        data: {
          timeline: timeline
        }
      });
    });

    console.log('tl action (in load/sync timeline): also syncBmCount');
    firebaseUtils.changeBmCount(tlId, count => {
      AppDispatcher.handleAction({
        actionType: appConstants.CHANGE_TIMELINE_BM,
        data: {
          count: count,
          tlId: tlId
        }
      });
    });

  },

  killTimelineSync(timelineId){ console.log('tl action: kill timelines sync');
    firebaseUtils.killTimelineSync();
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
