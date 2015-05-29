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

    changeTimelines: function(callback){
      console.log("fetching values in firebaseUtils");
       ref.child(publicTimelinesIndex).on("value", function(snapshot) {
         console.log(snapshot.val());
        callback(this.toArray(snapshot.val()));
      }.bind(this), function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

   },

    getTimelines: function(callback){
      ref.child(publicTimelinesIndex).on("value", function(snapshot) {
        console.log(snapshot.val());
        callback(this.toArray(snapshot.val()));
      }.bind(this), function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

      console.log("getting timelines in the firebase util");
    },

    addTimeline: function(timeline){

      // callback fun, 2 ops for timeline itself and an index
      let addIt = (cb) => {
        var fbRef = this.homeInstance().child(publicTimelines).push({
          owner: timeline.owner
        });
        cb(fbRef.key());
      };

      let setIndex = (fbKey) => {
        timeline.ref = fbKey;
        this.homeInstance().child(publicTimelinesIndex).push(timeline);
      };

    addIt(setIndex);

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

