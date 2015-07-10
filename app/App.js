require('normalize.css/normalize.css');
require('./styles/main.scss');

const React = require('react');
let Layout = require('./Layout');

let appActions = require('./actions/appActions');
let authUtils = require('./utils/authUtils');

class App extends React.Component {

  // returns layout function
  // bootstraps the app (sync user data, start router)
  // keeps state of the app

  constructor(props){
    super(props);
    this.state = {
      app: this,
      loc: {
        route: '',
        params: []
      },
      user: {
        username: "anonymous",
        bookmarks: []
      },
      auth: authUtils.isLoggedIn(),
      menuIsOpen: false,
      timelines: [],
      timeline: {
        dots: [],
        desc: 'timeline desc',
        name: "the legacy"
      }
    };
  }

  componentDidMount(){
    appActions.route(this.changeState.bind(this));
    //appActions.syncUser('tonton', user => this.changeState({user}));
  }

  changeState(data){ console.log(data);
    this.state.app.setState(data);
  }

  render() {
    return <Layout appState={this.state} changeState={this.changeState.bind(this)}/>;
  }

}

React.render(<App />, document.getElementById('app'));

