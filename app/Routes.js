const React = require('react');

let Login = require('./components/login/Login');
let TimelineContainer = require('./components/timeline/TimelineContainer');
let BrowseContainer = require('./components/browse/BrowseContainer');
let Account = require('./components/Account.js');
let About = require('./components/About.js');

export default class Routes extends React.Component {

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


