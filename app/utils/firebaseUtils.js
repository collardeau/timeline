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
      ref.child(publicTimelinesIndex)
      .on("value", function(snapshot) {
        console.log('fb: NEW tl index data');
        callback(this.toArray(snapshot.val()));
      }.bind(this), function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

   },

    addTimeline: function(timeline){

      let addPrivateIndexPromise = new Promise( (resolve, reject) => {
        let newRef = ref.child('user').child(timeline.owner).child('timelines').push(timeline);
        if (newRef){
          resolve(newRef.key());
        }else {
          reject();
        }
      });

      addPrivateIndexPromise.then( result => console.log(result));

      // 2 write ops for timeline itself and an index
      let fbRef;  // the firebase reference
      let addIt = (cb) => {
        if ( timeline.isPublic){
          fbRef = this.homeInstance().child(publicTimelines).push(timeline);
        }else{
          console.log("private timeline");
          fbRef = this.homeInstance().child('user').child(timeline.owner).child('private-timelines').push(timeline);
        }
        cb(fbRef.key());
      };
      let setIndex = (fbKey) => {
        timeline.ref = fbKey;
        this.homeInstance().child(publicTimelinesIndex).child('index' + fbKey).set(timeline);
      };

      // addIt(setIndex);

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

    ddeleteTimeline: function(timelineId){
      //ref.child
    },

    deleteTimeline: function(timelineId){
      console.log("firebase deleting timeline");
      this.homeInstance().child(publicTimelinesIndex).child('index' + timelineId).set({});
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

