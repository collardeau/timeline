var Firebase = require('firebase');
var appConstants = require('../constants/appConstants');
var mockup = require('./mockup.json');

var ref = new Firebase(appConstants.FIREBASE_HOST);
var userRef = ref.child('user');
let publicTimelines = 'timeline-public-index';
let timelines = 'timeline';
let timelineIndex = 'timeline-index';

let addTimelinePromise = (timeline) => {
  return new Promise((resolve, reject) => {
    let newRef = userRef.child(timeline.owner).child(timelines).push(timeline);
    if (newRef) { resolve( newRef.key()); }
    else { reject('The write failed'); }
  });
};

let getUserUidPromise = (username) => {
  return new Promise(( resolve, reject) => {
    ref.child('username-index').child(username).once('value', snapshot => {
     resolve(snapshot.val());
    }, (err) => reject(err.code));
  });
};

let isPublicTimeline = (tlId) => {
  return new Promise(( resolve, reject) => {
    ref.child(publicTimelines).child(tlId).once('value', snapshot => {
      if(snapshot.val()){ resolve(true); }
      resolve(false);
    });
  });
};

var firebaseUtils = {

    changePublicTimelines(callback){  // public indexes
      ref.child(publicTimelines)
      .on("value", function(snapshot) {
        console.log('fb: NEW tl index data');
        callback(this.toArray(snapshot.val()));
      }.bind(this), function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
   },

   changeTimelines: function(uid, cb) {  // own indexes
      userRef.child(uid).child(timelineIndex)
      .on("value", snapshot => {
        console.log('fb: NEW PRIVATE tl index data');
        cb(this.toArray(snapshot.val()));
      }.bind(this), errorObject => {
        console.log("The read failed: " + errorObject.code);
      });
    },

    killTimelines: function() {
      console.log('fbUtils: killing timelines');
      userRef.off('value', this.changeTimelines);
    },

    addTimeline(timeline, ui){

      let dots = timeline.dots;
      let owner = timeline.owner;
      delete timeline.dots;

      addTimelinePromise(timeline).then(id => {
        for(let dot of dots) { this.addDot(dot, id, owner); }
        ui(id);

        //indexes
        userRef.child(owner).child(timelineIndex).child(id).set(timeline);
        if(timeline.isPublic){
          ref.child(publicTimelines).child(id).set(timeline);
        }
      }, console.log);
    },

    loadTimeline(timelineId, user, cb){

      getUserUidPromise(user).then(uid => {
        userRef.child(uid).child(timelines).child(timelineId)
        .on("value", snapshot => {
          console.log("fb: NEW timeline data");
          let timelineObj = snapshot.val();
          if(timelineObj){
            timelineObj.dots = this.toArray(timelineObj.dots);
            cb(timelineObj);
          }
        }, errorObject => {
          console.log("The read failed: " + errorObject.code);
        });

      }, console.log);

   },

    editTimeline(updatedTl, tlId){

      // update user folder and user index folder
      userRef.child(updatedTl.owner).child(timelines).child(tlId).update(updatedTl);
      userRef.child(updatedTl.owner).child(timelineIndex).child(tlId).update(updatedTl);

      let isNowPublic = updatedTl.isPublic;

      isPublicTimeline(tlId).then(wasPublic => {
        if(wasPublic && !isNowPublic){
          ref.child(publicTimelines).child(tlId).set({});
        }
        if(!wasPublic && isNowPublic){
          ref.child(publicTimelines).child(tlId).set(updatedTl);
        }
      });
    },

    deleteTimeline(timelineId, timelineOwner){
      console.log("firebase deleting timeline");
      ref.child(publicTimelines).child(timelineId).set({});
      userRef.child(timelineOwner).child(timelineIndex).child(timelineId).set({});
      userRef.child(timelineOwner).child(timelines).child(timelineId).update({ deleted: true });
    },

    addDot: (dot, timelineId, uid) => {
      userRef.child(uid).child(timelines).child(timelineId).child("dots").push(dot);
    },

    removeDot(dotRef, timelineId, uid) {
      userRef.child(uid).child(timelines).child(timelineId).child("dots").child(dotRef).set({});
    },

    getUserData(userId, cb ) {  // firebase data, not auth
      ref.child('user').child(userId).child('info')
      .on("value", function(snapshot) {  // could be once?
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

