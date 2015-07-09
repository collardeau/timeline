import fireact from '../utils/fireact';

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
      loc: ['timeline-public-index'],
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
  }

};

