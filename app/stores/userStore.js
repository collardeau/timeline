const objectAssign = require('react/lib/Object.assign');
const EventEmitter = require('events').EventEmitter;
let AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');

let emptyStore = {
  username: '',
  lastNotice: ''
};

let _store = emptyStore;

const CHANGE_EVENT = 'change';

let userStore = objectAssign({}, EventEmitter.prototype, {

  changeUser(user) { _store = user ? user : emptyStore; },

  getUserData() { return _store; },

  changeNotice(notice) { _store.lastNotice = notice; },

  getNotice() { return _store.lastNotice; },

  addChangeListener(cb) { this.on(CHANGE_EVENT, cb); },
  removeChangeListener(cb) { this.removeListener(CHANGE_EVENT, cb); }

});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.CHANGE_USER:
      userStore.changeUser(action.data.userData);
      userStore.emit(CHANGE_EVENT);
      break;
   case appConstants.NOTIFY_USER:
      userStore.changeNotice(action.data);
      userStore.emit(CHANGE_EVENT);
      break;
    case appConstants.LOGOUT_USER:
      userStore.changeUser();
      userStore.emit(CHANGE_EVENT);
      break;
   default:
    return true;
  }
});

module.exports = userStore;
