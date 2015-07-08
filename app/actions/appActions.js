let fireact = require ('../utils/fireact');

let appActions = {

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
  }

};

module.exports = appActions;
