const React = require('react');
const hasher = require('hasher');

let App = require('./App');
let authUtils = require('./utils/authUtils');
let userStore = require('./stores/userStore');
let userActions = require('./actions/userActions');

let privateViews = [''];
let isPrivateRoute = (route) => privateViews.some((view) => view === route);

class Router extends React.Component {

  constructor() {
    super();
    hasher.init();
    this.state = {
      hashInfo: this.getHashInfo(),
      userAuth: authUtils.isLoggedIn(),
      userData: { nickname: "" }
    };
    this.handleChanges = this.handleChanges.bind(this); // hash changes
    this.changeUserContent = this.changeUserContent.bind(this);
    }

  componentDidMount() {
    console.log("the router mounted, adding userStore change listener");
    hasher.changed.add(this.handleChanges);
    //hasher.initialized.add(this.handleChanges);
    userStore.addChangeListener(this.changeUserContent);
    if(this.state.userAuth){
      userActions.changeUser(this.state.userAuth.uid);
    }
  }

  componentWillUpdate() {
    let route = hasher.getHash();
    if(isPrivateRoute(route) && authUtils.isLoggedOut()) {
      hasher.setHash('login');
    }
  }

    componentWillUnmount(){
      userStore.removeChangeListener(this.changeUserContent);
    }

    getHashInfo() {
      let hash = hasher.getHash();
      let parts = hash.split('/');
      return {
        route: parts.shift(),
        params: parts
      };
    }

    handleChanges(newHash, oldHash) {
      this.setState({
        hashInfo: this.getHashInfo()
      });
    }

    changeUserContent(){
      console.log("changing user content");
      this.setState({
        userData: {
          nickname: userStore.getNickname()
        }
      });
    }

    render () {
        return (
          <App route = { this.state.hashInfo.route }
            params = { this.state.hashInfo.params }
            userAuth = { this.state.userAuth }
            userData = { this.state.userData }
          />);
    }
}

React.render(
    <Router />,
    document.getElementById('app')
);

module.exports = Router;
