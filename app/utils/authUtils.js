const Firebase = require('firebase');
const appConstants = require('../constants/appConstants');
let hasher = require('hasher');
let firebaseUtils = require('./firebaseUtils');

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
    }, (error) => {
      if(error) { reject(error); }
      resolve(user);
    });
  });
};

let loginWithPw = (user) => {
  console.log('login with password');
  return new Promise(( resolve, reject) => {
    ref.authWithPassword({
      email: user.email,
      password: user.password
    }, (error, authData) => {
      if(error) { reject(error); }
      resolve(authData);
    });
  });
};

let register = (newUser, authData) => {
    let user = {
      email: newUser.email,
      username: newUser.username,
      uid: authData.uid,
      token: authData.token
    };
    ref.child('username-index').child(user.username).set(user.uid);
    ref.child('user').child(user.uid).child("info").set(user);
};

let firebaseAuth = {

  createUser: (user) => {
    return new Promise( (resolve, reject) => {
      saveUsername(user.username)
      .then(() => {
        createAuthUser(user)
        .then(loginWithPw)
        .then((auth) => {
          register(user, auth);
          resolve(auth);
        }, (error) => {
          removeUsername(user.username);
          reject(error.message);
        });
      }, (error) => reject(error));
    });

  },

  login: (user) => {
    return new Promise(( resolve, reject) => {
      loginWithPw(user).then(auth => {
        resolve(auth);
      }, error => {
        reject(error.message);
      });
    });

    //loginWithPw(user).then(auth => {
    //  return Promise.resolve(auth);
      //console.log('logged in');
      // cbOnSuccess(auth.uid);
    //}, cbOnFail);
  },

  logout: function() {
    ref.unauth(() => {
      console.log("logged out");
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
