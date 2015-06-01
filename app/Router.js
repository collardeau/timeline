const React = require('react');
const hasher = require('hasher');

let authUtils = require('./utils/authUtils');
let App = require('./App');

let privateViews = [''];
let isPrivateRoute = (route) => privateViews.some((view) => view === route);

class Router extends React.Component {

    constructor() {
      super();
      hasher.init();
      this.state = this.getParamInfo();
    }

    componentDidMount() {
      hasher.changed.add(this.handleChanges.bind(this));
      //hasher.initialized.add(this.handleChanges.bind(this));
  }

    componentWillUpdate() {
        let route = hasher.getHash();
        if(isPrivateRoute(route) && authUtils.isLoggedOut()) {
            hasher.setHash('login');
        }
    }

    getParamInfo() {
      let hash = hasher.getHash();
      let parts = hash.split('/');
      return {
        route: parts.shift(),
        params: parts
      };
    }

    handleChanges(newHash, oldHash) {
        this.setState(this.getParamInfo());
    }

    render () {
        return (
          <App route={ this.state.route }
            params={ this.state.params }
            user ={ authUtils.isLoggedIn() }
          />);
    }
}

React.render(
    <Router />,
    document.getElementById('app')
);

module.exports = Router;
