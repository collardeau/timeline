const objectAssign = require('react/lib/Object.assign');
const EventEmitter = require('events').EventEmitter;
let AppDispatcher = require('../dispatcher/AppDispatcher');
let appConstants = require('../constants/appConstants');

let browseStore = require('../stores/browseStore');


let _store = {};

const CHANGE_EVENT = 'change';

let bmStore = objectAssign({}, EventEmitter.prototype, {

  changeBmCount(count, tlId){ _store[tlId] = count; },

  getBmCount(tlId){ return _store[tlId] || 0; },

  addChangeListener(cb) { this.on(CHANGE_EVENT, cb); },
  removeChangeListener(cb) { this.removeListener(CHANGE_EVENT, cb); }

});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.CHANGE_BM_COUNT:
      bmStore.changeBmCount(action.data.count, action.data.tlId);
      bmStore.emit(CHANGE_EVENT);
      break;
    default:
  return true;
  }
});

module.exports = bmStore;
