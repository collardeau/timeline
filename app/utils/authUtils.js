const Firebase = require('firebase');
const appConstants = require('../constants/appConstants');
let hasher = require('hasher');
let firebaseUtils = require('./firebaseUtils');
let userActions = require('../actions/userActions');

let ref = new Firebase(appConstants.FIREBASE_HOST);

let addNewUserToFB = (newUser) => {
    ref.child('user').child(newUser.uid).child("info").set(newUser);
};

let saveUsername = (username) => {
  console.log('checking user name');
  return new Promise(( resolve, reject) => {
    ref.child('username').child(username).set(true, (error) => {
      if(error){ reject('Username already exists'); } // or could be no connection
      resolve();
    });
  });
};

let createAuthUser = (newUser) => {
  console.log('creating Auth User');
  return new Promise( (resolve, reject) => {
    ref.createUser(newUser, function(error){
      if(error) { console.log('error'); reject(error.message); }
      resolve();
    });
  });
};

let login = (user) => {
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

let firebaseAuth = {

  createUser: (user, options) => {

    saveUsername(options.nickname)   // err if already exists
      .then(createAuthUser.bind(this, user))
      .then(login.bind(this, user), options.warn );


      // .then(loginWithPw, options.warn);

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
