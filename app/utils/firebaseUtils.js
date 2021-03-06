var Firebase = require('firebase');
var appConstants = require('../constants/appConstants');
var mockup = require('./mockup.json');

var ref = new Firebase(appConstants.FIREBASE_HOST);
var userRef = ref.child('user');
var bmRef = ref.child('bmCount');
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

    changePublicTimelines(callback){
      ref.child(publicTimelines)
      .on("value", snapshot => {
        callback(this.toArray(snapshot.val()).reverse());
      }.bind(this), errorObject => { console.log("The read failed: " + errorObject.code); });
   },

   changeTimelines: function(uid, cb) {  // own indexes
     userRef.child(uid).child(timelineIndex)
     .on("value", snapshot => {
        cb(this.toArray(snapshot.val()).reverse());
      }.bind(this), errorObject => { console.log("The read failed: " + errorObject.code); });
    },

    changeBookmarks: function(uid, cb) {
      userRef.child(uid).child('bookmark-index')
      .on("value", snapshot => {
        cb(this.toArray(snapshot.val()).reverse());
      }.bind(this), errorObject => { console.log("The read failed: " + errorObject.code); });
    },

    killTimelines: function() { console.log('fbUtils: killing timelines');
      userRef.off('value', this.changeTimelines); // kill bookmarks ? simply off for all user refs
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

    loadTimeline: function(timelineId, user, cb){

      getUserUidPromise(user).then(uid => {
        userRef.child(uid).child(timelines).child(timelineId)
        .on("value", snapshot => {
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

   killTlSync: function(tlId, tlOwner){
     console.log(tlId, tlOwner);
     userRef.child(tlOwner).child(timelines).child(tlId).off();
   },

    changeBmCount: function(tlId, cb) {
      bmRef.child(tlId)
      .on("value", snapshot => { cb(snapshot.val()); },
        errorObject => { console.log('The read failed: ' + errorObject.code); });
    },

    killBmSync: function(tlId) { console.log('fbUtils: killBmSync');
      bmRef.child(tlId).off();
    },

   bookmarkTimeline(bookmark, tl, tlId, user){

    if(bookmark){ // add bookmark

      delete tl.dots;  // this is a clone of original timeline .... or fetch (latest?) from firebase

      userRef.child(user).child('info').child('bookmark').child(tlId).set(true); // user bookmark list
      userRef.child(user).child('bookmark-index').child(tlId).set(tl); // for user bookmark index
      ref.child('bmCount').child(tlId)
      .transaction(current_value => { return (current_value || 0) + 1; }); // count

    }else { // remove bookmark

      userRef.child(user).child('info').child('bookmark').child(tlId).set({});
      userRef.child(user).child('bookmark-index').child(tlId).set({});
      ref.child('bmCount').child(tlId)
      .transaction(current_value => { return current_value - 1; });

    }
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

