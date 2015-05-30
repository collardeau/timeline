var Firebase = require('firebase');
var appConstants = require('../constants/appConstants');
var ref = new Firebase(appConstants.FIREBASE_HOST);

var publicTimelinesIndex = 'public-timelines-index';
var publicTimelines = "public-timelines";

var addNewUserToFB = function(newUser){
    ref.child('user').child(newUser.uid).set(newUser);
};

var firebaseUtils = {

    homeInstance: function () {
        return new Firebase(appConstants.FIREBASE_HOST);
    },

    changeTimelines: function(callback){  // indexes
      console.log("fetching timelines in firebaseUtils");
       ref.child(publicTimelinesIndex).on("value", function(snapshot) {
        callback(this.toArray(snapshot.val()));
      }.bind(this), function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
   },

    addTimeline: function(timeline){

      // callback fun, 2 ops for timeline itself and an index
      let addIt = (cb) => {
        var fbRef = this.homeInstance().child(publicTimelines).push(timeline);
        cb(fbRef.key());
      };
      let setIndex = (fbKey) => {
        timeline.ref = fbKey;
        this.homeInstance().child(publicTimelinesIndex).push(timeline);
      };
    addIt(setIndex);

    },

    loadTimeline(timelineId, cb){
      ref.child(publicTimelines).child(timelineId).on("value", function(snapshot) {
        let timelineObj = snapshot.val();
        timelineObj.dots = this.toArray(timelineObj.dots);
        cb(timelineObj);
      }.bind(this), function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    },

    getTimeline(timelineId){
      // console.log("intending to get timeline: ", timelineId);
      // return a timeline
      // or damn it do an action for the initial loading
    },

    addItem: function (item) {
        this.homeInstance().child("list").push(item);
    },

    removeItem: function (key) {
        this.homeInstance().child("list").child(key).remove();
    },

    toArray: function (obj) {
        var arr = [];
        for (var key in obj) {
            obj[key].key = key;
            arr.push(obj[key]);
        }
        return arr;
    }
};

module.exports = firebaseUtils;

