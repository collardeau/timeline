let fireact = require ('../utils/fireact');

let appActions = {

  syncUser(options){
    console.log(options);
    fireact.subscribe(['test', options.q], options.ui)
  }


};

module.exports = appActions;
