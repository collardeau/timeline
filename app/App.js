require('normalize.css/normalize.css');
require('./styles/main.scss');

const React = require('react');
const Router = require('./Router');

let appActions = require('./actions/appActions');

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      app: this,
      route: '',
      routeParams: [],
      user: {
        username: "anonymous",
        bookmarks: []
      },
      auth: null,
      timelines: [],
      timeline: {
        dots: [],
        desc: 'timeline desc',
        name: "the legacy"
      }
    };
  }

  componentDidMount(){
    appActions.syncUser('tonton', user => this.setState({user}));
  }

  changeState(data){
    console.log('changing state');
    console.log(data);
    this.state.app.setState(data);
  }

  render() {
    return (
      <Router appState={this.state} changeState={this.changeState.bind(this)}/>
    );
  }

}

React.render(<App />, document.getElementById('app'));

