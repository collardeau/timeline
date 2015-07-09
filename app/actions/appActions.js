import fireact from '../utils/fireact';
import { firebase } from '../constants/appConstants.js';

export default {

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

