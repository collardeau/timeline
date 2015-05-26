const React = require('react');
const hasher = require('hasher');

let authUtils = require('./utils/authUtils');
let App = require('./App');

let privateViews = [''];
let isPrivateRoute = (route) => privateViews.some((view) => view === route);

class Router extends React.Component {

    constructor() {
        super();
        this.state = {
          route: "",
          params: ""
        };
    }

    componentDidMount() {

        // from hasher lib
        hasher.changed.add(this.handleChanges.bind(this));
        hasher.initialized.add(this.handleChanges.bind(this));
        hasher.init();

        let parts = hasher.getHash().split('/');

        this.setState({
          route: parts.shift(),
          params: parts
        });
    }

    componentWillUpdate() {
        let route = hasher.getHash();
        if(isPrivateRoute(route) && authUtils.isLoggedOut()) {
            hasher.setHash('login');
        }
    }

    handleChanges(newHash, oldHash) {

        let parts = newHash.split('/');

        this.setState({
          route: parts.shift(),
          params: parts
        });
    }

    render () {
        return (
            <App route={ this.state.route } params={ this.state.params } />);
    }
}

React.render(
    <Router />,
    document.getElementById('app')
);

module.exports = Router;
