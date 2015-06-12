const AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');
let authUtils = require('../utils/authUtils');
let timelineActions = ('./timelineActions');
let firebaseUtils = require('../utils/firebaseUtils');

let userActions = {

  logoutUser(ui) {
    console.log('user action: logoutUser');
    authUtils.logout();
    firebaseUtils.killTimelines();
    AppDispatcher.handleAction({
      actionType: appConstants.LOGOUT_USER
    });
    ui();
  },

  changeUser(userId) {
    if(userId) {
      firebaseUtils.getUserData(userId, function(userData){
        AppDispatcher.handleAction({
          actionType: appConstants.CHANGE_USER,
          data: {
            userData: userData
          }
        });
      });
    } else {
      AppDispatcher.handleAction({
        actionType: appConstants.CHANGE_USER,
        data: {
          userData: null
        }
      });
    }
  }

};

module.exports = userActions;
