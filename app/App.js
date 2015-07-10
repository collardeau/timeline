require('normalize.css/normalize.css');
require('./styles/main.scss');

const React = require('react');
let Layout = require('./components/Layout');

let appActions = require('./actions/appActions');

class App extends React.Component {

  // returns layout function
  // bootstraps the app (sync user data, start router)
  // keeps state of the app

  constructor(){
    super();
    this.state = {
      app: this,
      auth: appActions.checkAuth(),
      loc: {
        route: '',
        params: []
      },
      user: {
        username: "",
        bookmarks: []
      },
      warning: {
        message: ''
      },
      menuIsOpen: false,
      timelines: [],
      timeline: {
        dots: [],
        desc: 'desc',
        name: "legacy"
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

