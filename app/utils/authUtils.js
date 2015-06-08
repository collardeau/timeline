const Firebase = require('firebase');
const appConstants = require('../constants/appConstants');
let hasher = require('hasher');
let firebaseUtils = require('./firebaseUtils');
let userActions = require('../actions/userActions');

let ref = new Firebase(appConstants.FIREBASE_HOST);

let saveUsername = (user) => {
  return new Promise(( resolve, reject) => {
    ref.child('username').child(user.username).set(true, (error) => {
      if(error){ reject('Username already exists'); } // or could be no connection
      resolve(user);
    });
  });
};

let createAuthUser = (user) => {
  return new Promise( (resolve, reject) => {
    ref.createUser({
      email: user.email,
      password: user.password
    }, function(error){
      if(error) { console.log('error'); reject(error.message); }
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

let register = (newUser, authData) => {
  return new Promise(( resolve, reject) => {
    let user = {
      email: newUser.email,
      username: newUser.username,
      uid: authData.uid,
      token: authData.token
    };
    ref.child('user').child(user.uid).child("info").set(user, (error) => {
      if(error){ reject("Could not register"); }
      resolve();
    });

  });
};


let firebaseAuth = {

  createUser: (user, cbOnFail, cbOnSuccess) => {
    saveUsername(user)
    .then(createAuthUser)
    .then(loginWithPw)
    .then(register.bind(this, user))
    .then(cbOnSuccess, cbOnFail);
  },

  login: (user, cbOnFail, cbOnSuccess) => {
    loginWithPw(user).then(cbOnSuccess, cbOnFail);
  },

  isLoggedIn: function(){
    return ref.getAuth();
  },

  isLoggedOut: function(){
    return !this.isLoggedIn();
  },

  logout: function(){
    ref.unauth(function(){
      console.log("logged out");
      userActions.changeUser();
    });
    hasher.setHash('login');
  }

};

module.exports = firebaseAuth;
