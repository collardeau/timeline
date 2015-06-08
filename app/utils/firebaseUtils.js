var Firebase = require('firebase');
var appConstants = require('../constants/appConstants');
var mockup = require('./mockup.json');

var ref = new Firebase(appConstants.FIREBASE_HOST);
var userRef = ref.child('user');
let publicTimelines = 'timeline-public-index';
let timelines = 'timeline';
let timelineIndex = 'timeline-index';

let addUserTimelinePromise = (timeline) => {
  return new Promise((resolve, reject) => {
    let newRef = userRef.child(timeline.owner).child(timelines).push(timeline);
    if (newRef) { resolve( newRef.key()); }
    else { reject('The write failed'); }
  });
};

var firebaseUtils = {

    changePublicTimelines: function(callback){  // public indexes
      ref.child(publicTimelines)
      .on("value", function(snapshot) {
        console.log('fb: NEW tl index data');
        callback(this.toArray(snapshot.val()));
      }.bind(this), function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
   },

    changeTimelines: function(uid, callback){  // own indexes
      userRef.child(uid).child(timelines)
      .on("value", function(snapshot) {
        console.log('fb: NEW PRIVATE tl index data');
        callback(this.toArray(snapshot.val()));
      }.bind(this), function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    },

    addTimeline: function(timeline){

      addUserTimelinePromise(timeline).then(id => {
        userRef.child(timeline.owner).child(timelineIndex).child(id).set(timeline);
        if(timeline.isPublic){
          ref.child(publicTimelines).child(id).set(timeline);
        }
      }, console.log);
    },

    loadTimeline(timelineId, cb){

      console.log("fb: fetching timeline (loadingTimeline) ");
      ref.child(publicTimelines).child(timelineId)
      .on("value", function(snapshot) {
        console.log("fb: NEW timeline data");
        let timelineObj = snapshot.val();
        if(timelineObj){
          timelineObj.dots = this.toArray(timelineObj.dots);
          cb(timelineObj);
        }
      }.bind(this), function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

   },

    editTimeline: function(updatedTl, tlId){
      this.homeInstance().child(publicTimelines).child(tlId).update(updatedTl);
    },

    ddeleteTimeline: function(timelineId){
      //ref.child
    },

    deleteTimeline: function(timelineId){
      console.log("firebase deleting timeline");
      this.homeInstance().child(publicTimelines).child(timelineId).set({});
    },

    addDot: function(dot, timelineId) {
      this.homeInstance().child(publicTimelines).child(timelineId).child("dots").push(dot);
    },

    removeDot: function(dotRef, timelineId) {
      this.homeInstance().child(publicTimelines).child(timelineId).child('dots').child(dotRef).set({});
    },

    getUserData: function(userId, cb ) {
      ref.child('user').child(userId).child('info')
      .on("value", function(snapshot) {
        console.log("fb: NEW user data");
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

      //using mock up for developing
      // console.log("fetching timelines from mockups");
      // let timelines = this.toArray(mockup[publicTimelinesIndex]);
      // window.setTimeout(function(){
      //   callback(timelines);
      // }, 1000);
      // FROM MOCKUP
      // console.log("loading timeline from mockup");
      // let timeline = mockup[publicTimelines][timelineId];
      // timeline.dots = this.toArray(timeline.dots);
      // window.setTimeout(function(){
      //   cb(timeline);
      // }, 1000);

