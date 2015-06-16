require('normalize.css/normalize.css');
require('./styles/main.scss');

const React = require('react');

let Login = require('./components/login/Login');
let TimelineContainer = require('./components/timeline/TimelineContainer');
let BrowseContainer = require('./components/browse/BrowseContainer');
let Account = require('./components/Account.js');
let About = require('./components/About.js');

let userActions = require('./actions/userActions');
let userStore = require('./stores/userStore');

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      userData: { username: "", bookmarks: [] }
    };
    this.changeUserContent = this.changeUserContent.bind(this);
  }

  componentDidMount(){

    console.log("app: mount");
    if (this.props.userAuth){
      userActions.initUserData(this.props.userAuth.uid);
      console.log('user is logged in');
    } else {
      console.log('not logged in');
    }
    userStore.addChangeListener(this.changeUserContent);
  }

  componentWillUnmount(){
    userStore.removeChangeListener(this.changeUserContent);
  }

  render() {

      switch(this.props.route) {

          case "browse":
            return (
              <BrowseContainer
                userAuth={ this.props.userAuth }
                userData = { this.state.userData }
              />
            );

         case "u":
             return (
              <TimelineContainer
                params = { this.props.params }
                userAuth = { this.props.userAuth }
                userData = { this.state.userData }
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
                userData = { this.state.userData }
              />
          );
      }

  }

  changeUserContent(){
    console.log("app callback: changing user content");
    this.setState({
      userData: userStore.getUserData()
   });
  }


}

module.exports = App;
