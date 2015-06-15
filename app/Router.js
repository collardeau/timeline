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
    console.log("initializing hasher");
    hasher.init();
    this.state = {
      hashInfo: this.getHashInfo(),
      userAuth: authUtils.isLoggedIn(),
      userData: { username: "", bookmarks: [] }
    };
    this.handleChanges = this.handleChanges.bind(this); // hash changes
    this.changeUserContent = this.changeUserContent.bind(this);
    }

  componentDidMount() {
    console.log("router mount");
    hasher.changed.add(this.handleChanges);
    //hasher.initialized.add(this.handleChanges);
    userStore.addChangeListener(this.changeUserContent);
    if(this.state.userAuth){
      console.log('router: user logged in');
      //userActions.changeUser(this.state.userAuth.uid);
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
      console.log("router callback: changing user content");
      this.setState({
        userData: userStore.getUserData()
        // {
        //   username: userStore.getUsername(),
        //   bookmarks: userStore.getBookmarks()   // should be actions??
        // },
        //   userAuth: authUtils.isLoggedIn()
      });
      console.log(this.state);
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
