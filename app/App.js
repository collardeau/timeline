require('normalize.css/normalize.css');
require('./styles/main.scss');

const React = require('react');
const $ = require('jquery');

let Login = require('./components/login/Login');
let TimelineContainer = require('./components/timeline/TimelineContainer');
let BrowseContainer = require('./components/browse/BrowseContainer');
let Account = require('./components/Account.js');
let About = require('./components/About.js');

let userActions = require('./actions/userActions');
let userStore = require('./stores/userStore');

class App extends React.Component {

  componentDidMount(){

    console.log("app: mount");

    if (this.props.userAuth){
      userActions.initUserData(this.props.userAuth.uid);
      // listener ?here userStore.
    } else {
      console.log('not logged in');
    }

 }

    render() {

        switch(this.props.route) {

            case "browse":
              return (
                <BrowseContainer
                  userAuth={ this.props.userAuth }
                  userData = { this.props.userData }
                />
              );

           case "u":
               return (
                <TimelineContainer
                  params = { this.props.params }
                  userAuth = { this.props.userAuth }
                  userData = { this.props.userData }
                />
              );

            case "account":
              return (
                <Account userAuth= { this.props.userAuth } />
              );

            case "login":
              return <Login />;

            case "about":
              return <About />;

            default:
              return (
                <BrowseContainer
                  userAuth={ this.props.userAuth }
                  userData = { this.props.userData }
                />
            );
        }

    }
}

module.exports = App;
