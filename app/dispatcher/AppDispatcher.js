var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

AppDispatcher.handleAction = function(action){
  console.log('now dispatching: ', action);
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
  console.log('dipsatch done');
};

module.exports = AppDispatcher;

