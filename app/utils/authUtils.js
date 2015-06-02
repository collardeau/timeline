const Firebase = require('firebase');
const appConstants = require('../constants/appConstants');
let hasher = require('hasher');
let ref = new Firebase(appConstants.FIREBASE_HOST);

let firebaseUtils = require('./firebaseUtils');

let addNewUserToFB = (newUser) => {
    ref.child('user').child(newUser.uid).child("info").set(newUser);
};

let firebaseAuth = {

  createUser: function(user, options) {
    ref.createUser(user, function(error) {
      if (error) {
        let dummy = options.warn && options.warn(error);
      } else {

        this.loginWithPw(user, {

          register: (authData) => {
            addNewUserToFB({
              email: user.email,
              uid: authData.uid,
              token: authData.token,
              nickname: options.nickname
            });
          }
        });
      }
    }.bind(this));
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
    });
    hasher.setHash('login');
  }

};

module.exports = firebaseAuth;
