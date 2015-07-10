require('normalize.css/normalize.css');
require('./styles/main.scss');

const React = require('react');
let Routes = require('./Routes');
let Menu = require('./components/Menu');
let Heading = require('./components/Heading');

let appActions = require('./actions/appActions');
let router = require('./utils/lil-router');

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
    appActions.syncUser('tonton', user => this.changeState({user}));
  }

  changeState(data){ console.log(data);
    this.state.app.setState(data);
  }
  render() {
    return (
      <div>
        <Heading>{this.state.route}</Heading>
        <Routes appState={this.state} changeState={this.changeState.bind(this)}/>;
        <Menu />
      </div>
    );
  }

}

React.render(<App />, document.getElementById('app'));

