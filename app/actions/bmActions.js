const AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');
let firebaseUtils = require('../utils/firebaseUtils');

let bmActions = {

  changeBm(tlId){ console.log('bmAction: sync BM');
    firebaseUtils.changeBmCount(tlId, count => {
      AppDispatcher.handleAction({
        actionType: appConstants.CHANGE_BM_COUNT,
        data: {
          count: count,
          tlId: tlId
        }
      });
    });
  },

  changeBmCounts(tlIds) {
    console.log('bmaction: change bm Counts');
    console.log(tlIds);
    tlIds.forEach( tlId => {
      firebaseUtils.changeBmCount(tlId, count => {
        console.log(count);
        AppDispatcher.handleAction({
          actionType: appConstants.CHANGE_BM_COUNT,
          data: {
            count: count,
            tlId: tlId
          }
        });
      });
    });
  }

};

module.exports = bmActions;
