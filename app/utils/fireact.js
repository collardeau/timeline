let Firebase = require('firebase');

let ref = new Firebase('https://time-line.firebaseio.com/');

let buildPath = (path) => {
  return path.reduce((prev, next) => {
    return prev.child(next);
  }, ref);
};

let toArray = obj => {
  var arr = [];
  for (var key in obj) {
    obj[key].key = key;
    arr.push(obj[key]);
  }
  return arr;
};

module.exports = {

  subscribe(options){
    let { loc, asArray, then } = options;
    buildPath(loc).on("value", snapshot => {
      let data = snapshot.val();
      if(asArray){ data = toArray(data); }
      then(data);
    }, errorObject => console.log("The read failed: " + errorObject.code));
  },

  unsubscribe(options){
    buildPath(options.loc).off('value');
  }

};
