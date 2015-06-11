const Firebase = require('firebase');
const appConstants = require('../constants/appConstants');
let hasher = require('hasher');
let firebaseUtils = require('./firebaseUtils');
let userActions = require('../actions/userActions');

let ref = new Firebase(appConstants.FIREBASE_HOST),
    usernameRef = ref.child('username');

let saveUsername = (username) => {
  return new Promise(( resolve, reject) => {
    ref.child('username').child(username).set(true, (error) => {
      if(error){ reject('Username already exists'); } // or could be no connection
      resolve(username);
    });
  });
};

let removeUsername = (username) => {
  return new Promise( (resolve, reject) => {
    usernameRef.child(username).set({}, (error) => {
      if(error) { reject('could not delete username'); }
      resolve();
    });
  });
};

let createAuthUser = (user) => {
  return new Promise( (resolve, reject) => {
    ref.createUser({
      email: user.email,
      password: user.password
    }, function(error){
      if(error) { reject(error.message); }
      resolve(user);
    });
  });
};

let loginWithPw = (user) => {
  return new Promise(( resolve, reject) => {
    ref.authWithPassword({
      email: user.email,
      password: user.password
    }, (error, authData) => {
      if(error) { reject(error.message); }
      resolve(authData);
    });
  });
};

let register = (newUser, authData) => { // doesn't need to be a promise
  return new Promise(( resolve, reject) => {
    let user = {
      email: newUser.email,
      username: newUser.username,
      uid: authData.uid,
      token: authData.token
    };

    ref.child('username-index').child(user.username).set(user.uid, (error) => {
      if(error){ reject("Error registering"); }
    });

    ref.child('user').child(user.uid).child("info").set(user, (error) => {
      if(error){ reject("Could not register"); }
      resolve();
    });

  });
};

let firebaseAuth = {

  createUser: (user, cbOnFail, cbOnSuccess) => {

    saveUsername(user.username)
    .then(() => {
      createAuthUser(user)
      .then(loginWithPw)
      .then((auth) => {
        register(user, auth);
        cbOnSuccess();
      }, (error) => {
        removeUsername(user.username)
        .then(cbOnFail.bind(this, error), console.log);
      });
    }, cbOnFail);

  },

  login: (user, cbOnFail, cbOnSuccess) => {
    loginWithPw(user).then(auth => {
      console.log('logged in');
      cbOnSuccess(auth.uid);
    }, cbOnFail);
  },

  logout: (cb) => {
    ref.unauth(() => {
      console.log("logged out");
      cb();
    });
  },

  isLoggedIn: function(){
    return ref.getAuth();
  },

  isLoggedOut: function(){
    return !this.isLoggedIn();
  }

};

module.exports = firebaseAuth;
