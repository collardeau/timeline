const AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');
let firebaseUtils = require('../utils/firebaseUtils');
let browseStore = require('../stores/browseStore');

let bmActions = {

  //   changeBm(tlId){ console.log('bmAction: sync BM');
  //     firebaseUtils.changeBmCount(tlId, count => {
  //       AppDispatcher.handleAction({
  //         actionType: appConstants.CHANGE_BM_COUNT,
  //         data: {
  //           count: count,
  //           tlId: tlId
  //         }
  //       });
  //     });
  //   },

  syncBmCounts(tlIds){ console.log('sync bmCounts');
    tlIds.forEach( tlId => {
      this.changeBmCount(tlId);
    });
  },

  changeBmCount(tlId){ console.log('bm action: changeBmCount');
    firebaseUtils.changeBmCount(tlId, count => {
      AppDispatcher.handleAction({
        actionType: appConstants.CHANGE_BM_COUNT,
        data: {
          count: count || 0,
          tlId: tlId
        }
      });
    });
  },

  killBmCounts(tlIds){ console.log('bm action: killMbCounts');
    tlIds.forEach( tlId => {
      this.killBmCount(tlId);
    });
  },

  killBmCount(tlId){ 
    firebaseUtils.killBmSync(tlId);
  }

  //   changeBmCounts(tlIds) {
  //     console.log('bmaction: change bm Counts');
  //     tlIds.forEach( tlId => {
  //       firebaseUtils.changeBmCount(tlId, count => {
  //         AppDispatcher.handleAction({
  //           actionType: appConstants.CHANGE_BM_COUNT,
  //           data: {
  //             count: count,
  //             tlId: tlId
  //           }
  //         });
  //       });
  //     });
  //   }

};

module.exports = bmActions;
