const objectAssign = require('react/lib/Object.assign');
const EventEmitter = require('events').EventEmitter;
let AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');

let _store = {
  nickname: 'Henry',
  bookmarks: [34, 56, 567]
};

const CHANGE_EVENT = 'change';

let userStore = objectAssign({}, EventEmitter.prototype, {

  changeUser(user) {
    _store = user;
  },

  getNickname(){
    return _store.nickname;
  },

  getUserData() {
    return _store;
  },

  addChangeListener(cb) { this.on(CHANGE_EVENT, cb); },
  removeChangeListener(cb) { this.removeListner(CHANGE_EVENT, cb); }

});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.CHANGE_USER:
      userStore.changeUser(action.data.userData);
      userStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = userStore;
