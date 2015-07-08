require('normalize.css/normalize.css');
require('./styles/main.scss');

const React = require('react');
const Router = require('react-lil-router');
const Routes = require('./Routes');

let fireact = require('./utils/fireact');

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = { 
      user: { 
        username: "anonymous", 
        bookmarks: []
      },
      auth: null
    };
  }

  componentDidMount(){
    fireact.subscribe('user', user => {
      this.setState({user});
    });
    
  }

  render() {
    return (
      <Router>
        <Routes appState={this.state}/>
      </Router>
    );
  }

}

React.render(<App />, document.getElementById('app'));

