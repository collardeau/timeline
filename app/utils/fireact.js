let firebase = require('firebase');

let ref = new Firebase('https://time-line.firebaseio.com/');

let buildPath = (path) => {
  return path.reduce((prev, next) => {
    return prev.child(next); 
  }, ref)
}

module.exports = {
  
  subscribe(path, cb){
    buildPath(path).on("value", 
      snapshot => cb(snapshot.val()), 
      errorObject => console.log("The read failed: " + errorObject.code));
  }

};
