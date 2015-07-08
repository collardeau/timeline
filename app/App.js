require('normalize.css/normalize.css');
require('./styles/main.scss');

const React = require('react');
const Router = require('react-lil-router');
const Routes = require('./Routes');

class App extends React.Component {

  constructor(){
    super();
    this.state = { 
      userData: { 
        username: "Billy", 
        bookmarks: [] 
      } 
    };
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

