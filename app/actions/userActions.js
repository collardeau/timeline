const AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');
let firebaseUtils = require('../utils/firebaseUtils');

let userActions = {

  changeUser(userId) {
    firebaseUtils.getUserData(userId, function(userData){
      AppDispatcher.handleAction({
        actionType: appConstants.CHANGE_USER,
        data: {
          userData: userData
        }
      });
    });
  }

};

module.exports = userActions;