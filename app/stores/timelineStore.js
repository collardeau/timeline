/**
 * Created by Thomas on 5/9/15.
 */

//let AppDispatcher = require('../dispatcher/AppDispatcher');
//let appConstants = require('../constants/appConstants');
const objectAssign = require('react/lib/Object.assign');
const EventEmitter = require('events').EventEmitter;
//
//const CHANGE_EVENT = 'change';

let moment = require('moment');

// init some data, could be a store
let date1 = moment("1977-03-26").unix();
let date2 = moment().unix();

let _store = {
    dots: [date1, date2]
};

let timelineStore = objectAssign({}, EventEmitter.prototype, {

    getDots() { return _store.dots; },

    addDot(dot) {
        _store.dots.push(dot);
    }

});

//AppDispatcher.register(function(payload){
//    var action = payload.action;
//    switch(action.actionType){
//        case appConstants.GET_DATA:
//            setList(action.data.list);
//            listStore.emit(CHANGE_EVENT);
//            break;
//        case appConstants.ADD_ITEM:
//            addItem(action.data);
//            listStore.emit(CHANGE_EVENT);
//            break;
//        case appConstants.REMOVE_ITEM:
//            removeItem(action.data.index);
//            listStore.emit(CHANGE_EVENT);
//            break;
//        default:
//            return true;
//    }
//});

module.exports = timelineStore;
