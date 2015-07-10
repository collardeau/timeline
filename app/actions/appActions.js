import { firebase } from '../constants/appConstants.js';
import fireact from '../utils/fireact';
import router from '../utils/lil-router';
import authUtils from '../utils/authUtils';

export default {

  checkAuth(){
    return authUtils.isLoggedIn();
  },

  route(ui){
    router().start(ui);
  },

  login(user, ui){
    authUtils.login(user).then(auth => {
      ui.success(auth);
    });
  },

  logout(ui){
    authUtils.logout();
    ui({auth: null});
  },

  syncUser(userId, ui){
    fireact.subscribe({
      loc: ['test', userId],
      asArray: false,
      then: ui
    });
  },

  syncTimelines(ui){
    fireact.subscribe({
      loc: [firebase.PUBLIC_INDEX],
      asArray: true,
      then: ui
    });
  },

  syncTimeline(options, ui){
    fireact.subscribe({
      loc: ['user', 'simplelogin:72', 'timeline', '-JrdC_gXXwKUTcffcVPX'],
      asArray: false,
      then: ui
    });
  },

  cutSync(){
    fireact.unsubscribe({
      loc: [firebase.PUBLIC_INDEX]
    });
  }

};

