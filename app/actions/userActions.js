const AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');
let authUtils = require('../utils/authUtils');
let timelineActions = ('./timelineActions');
let firebaseUtils = require('../utils/firebaseUtils');

let userActions = {

  // register?

  initUserData(uid){

    firebaseUtils.getUserData(uid, userData => {
      AppDispatcher.handleAction({
        actionType: appConstants.CHANGE_USER,
        data: { userData: userData }
      });
    });

   firebaseUtils.changeTimelines(uid, timelines => {
      AppDispatcher.handleAction({
        actionType: appConstants.CHANGE_TIMELINES,
        data: { timelines: timelines }
      });
    });

  },

  loginUser(user, uiError, ui){
    authUtils.login(user).then(auth => {
      this.initUserData(auth.uid);
      ui();
    }, uiError );
  },

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
