require('normalize.css/normalize.css');
require('./styles/main.scss');

const React = require('react');
const Router = require('react-lil-router');
const Routes = require('./Routes');

let appActions = require('./actions/appActions');

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      app: this,
      user: {
        username: "anonymous",
        bookmarks: []
      },
      auth: null,
      timelines: []
    };
  }

  componentDidMount(){
    appActions.syncUser('tonton', user => this.setState({user}));
  }

  changeState(data){
    // record history?
    this.state.app.setState(data);
  }

  render() {
    return (
      <Router>
        <Routes appState={this.state} changeState={this.changeState.bind(this)}/>
      </Router>
    );
  }

}

React.render(<App />, document.getElementById('app'));

