var Firebase = require('firebase');
var appConstants = require('../constants/appConstants');
var ref = new Firebase(appConstants.FIREBASE_HOST);

var mockup = require('./mockup.json');

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
      ref.child(publicTimelinesIndex)
      .on("value", function(snapshot) {
        callback(this.toArray(snapshot.val()));
      }.bind(this), function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

      //using mock up for developing
      // console.log("fetching timelines from mockups");
      // let timelines = this.toArray(mockup[publicTimelinesIndex]);
      // window.setTimeout(function(){
      //   callback(timelines);
      // }, 1000);
    },

    addTimeline: function(timeline){

      // 2 write ops for timeline itself and an index
      let addIt = (cb) => {
        var fbRef = this.homeInstance().child(publicTimelines).push(timeline);
        cb(fbRef.key());
      };
      let setIndex = (fbKey) => {
        timeline.ref = fbKey;
        this.homeInstance().child(publicTimelinesIndex).child('index' + fbKey).set(timeline);
      };

    addIt(setIndex);

    },

    loadTimeline(timelineId, cb){

      console.log("fetching timeline from database");
      ref.child(publicTimelines).child(timelineId)
      .on("value", function(snapshot) {
        let timelineObj = snapshot.val();
        timelineObj.dots = this.toArray(timelineObj.dots);
        cb(timelineObj);
      }.bind(this), function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

      // FROM MOCKUP
      // console.log("loading timeline from mockup");
      // let timeline = mockup[publicTimelines][timelineId];
      // timeline.dots = this.toArray(timeline.dots);
      // window.setTimeout(function(){
      //   cb(timeline);
      // }, 1000);
    },

    editTimeline: function(updatedTl, tlId){
      this.homeInstance().child(publicTimelines).child(tlId).update(updatedTl);
      this.homeInstance().child(publicTimelinesIndex).child('index' + tlId).update(updatedTl);
    },

    addDot: function(dot, timelineId) {
      this.homeInstance().child(publicTimelines).child(timelineId).child("dots").push(dot);
    },

    getUserData: function(userId, cb ) {
      ref.child('user').child(userId).child('info')
      .on("value", function(snapshot) {
        console.log(snapshot.val());
        cb(snapshot.val());
      }, function(errorObject){
        console.log("The read failed: " + errorObject.code);
      });
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

