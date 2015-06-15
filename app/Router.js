const React = require('react');
const hasher = require('hasher');

let App = require('./App');
let authUtils = require('./utils/authUtils');

let privateViews = [''];
let isPrivateRoute = (route) => privateViews.some((view) => view === route);

class Router extends React.Component {

  constructor() {
    super();
    console.log("initializing hasher");
    hasher.init();
    this.state = {
      hashInfo: this.getHashInfo(),
      userAuth: authUtils.isLoggedIn()
    };
    this.handleChanges = this.handleChanges.bind(this); // hash changes
    }

  componentDidMount() {
    console.log("router mount");
    hasher.changed.add(this.handleChanges);
    //hasher.initialized.add(this.handleChanges);

  }

  componentWillUpdate() {
    let route = hasher.getHash();
    if(isPrivateRoute(route) && authUtils.isLoggedOut()) {
      hasher.setHash('login');
    }
  }

  getHashInfo() {
    let hash = hasher.getHash();
    let parts = hash.split('/');
    return {
      route: parts.shift(),
      params: parts
    };
  }

  render () {
      return (
        <App route = { this.state.hashInfo.route }
          params = { this.state.hashInfo.params }
          userAuth = { this.state.userAuth }
        />);
  }

  handleChanges(newHash, oldHash) {
    this.setState({
      hashInfo: this.getHashInfo()
    });
  }

}

React.render(
    <Router />,
    document.getElementById('app')
);

module.exports = Router;
