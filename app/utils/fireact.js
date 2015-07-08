let firebase = require('firebase');

let ref = new Firebase('https://time-line.firebaseio.com/');

let buildPath = (path) => {
  return path.reduce((prev, next) => {
    return prev.child(next); 
  }, ref)
};

let toArray = obj => {
  var arr = [];
  for (var key in obj) {
    obj[key].key = key;
    arr.push(obj[key]);
  }
  return arr;
}


module.exports = {
  
  subscribe(options){
    buildPath(options.loc).on("value", snapshot => {
      let data = snapshot.val();
      if(options.asArray){ data = toArray(data); }
      options.then(data);
    },  errorObject => console.log("The read failed: " + errorObject.code));
  }

};
