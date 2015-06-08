const Firebase = require('firebase');
const appConstants = require('../constants/appConstants');
let hasher = require('hasher');
let firebaseUtils = require('./firebaseUtils');
let userActions = require('../actions/userActions');

let ref = new Firebase(appConstants.FIREBASE_HOST);

let addNewUserToFB = (newUser) => {
    ref.child('user').child(newUser.uid).child("info").set(newUser);
};

let firebaseAuth = {

  createUser: function(user, options) {

    let saveUsername = (username) => {
      return new Promise(( resolve, reject) => {
        ref.child('username').child(username).set(user.email, (error) => {
          if(error){ reject('Username already exists'); } // or could be no connection
          resolve();
        });
      });
    };

    let createFbUser = (newUser) => {
      return new Promise( (resolve, reject) => {
        ref.createUser(newUser, function(error){
          if(error) { reject(error.message); }
          resolve();
        });
      });
    };

    saveUsername(options.nickname)
      .then(createFbUser.bind(this, user))
      .then(console.log, options.warn);
      // .then(loginWithPw, options.warn);

        // ref.createUser(user, function(error) {
    //   if (error) {
    //     let dummy = options.warn && options.warn(error);
    //   } else {

    //     this.loginWithPw(user, {

    //       register: (authData) => {
    //         addNewUserToFB({
    //           email: user.email,
    //           uid: authData.uid,
    //           token: authData.token,
    //           nickname: options.nickname
    //         });
    //       }
    //     });
    //   }
    // }.bind(this));
  },

  loginWithPw: function(user, options){

    ref.authWithPassword({
      email: user.email,
      password: user.password

    }, function(error, authData) {
      let dummy;  // to avoid eslint error
      if (error) {
        dummy = options.warn && options.warn(error);
      } else {
        dummy = options.register && options.register(authData);
        hasher.setHash('browse');
        userActions.changeUser(authData.uid);
      }

    });
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
