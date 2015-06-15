const AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');
let firebaseUtils = require('../utils/firebaseUtils');

let bmActions = {

  changeBm(tlId){
    console.log('action: change bm');
    firebaseUtils.changeBmCount(tlId, count => {
      AppDispatcher.handleAction({
        actionType: appConstants.CHANGE_BM_COUNT,
        data: {
          count: count,
          tlId: tlId
        }
      });
    });
  }

};

module.exports = bmActions;
