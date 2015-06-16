const AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');
let authUtils = require('../utils/authUtils');
let firebaseUtils = require('../utils/firebaseUtils');

let userActions = {

  changeUserData(uid){ console.log('user action: change user');

    firebaseUtils.getUserData(uid, userData => {
      AppDispatcher.handleAction({
        actionType: appConstants.CHANGE_USER,
        data: { userData: userData }
      });
    });

  },

  createUser(user, uiError, ui) {
    authUtils.createUser(user).then(auth => {
      this.initUserData(auth.uid);
      ui();
    }, uiError);
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
  }

};

module.exports = userActions;
