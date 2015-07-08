require('normalize.css/normalize.css');
require('./styles/main.scss');

const React = require('react');
const Router = require('react-lil-router');
const Routes = require('./Routes');

let userActions = require('./actions/userActions');
let userStore = require('./stores/userStore');

class App extends React.Component {

  constructor(){
    super();
    this.state = { 
      userData: { username: "Billy", bookmarks: [] } 
    };
    this.changeUserContent = this.changeUserContent.bind(this);
  }

  componentDidMount(){
    if (this.props.userAuth) {
      userActions.changeUserData(this.props.userAuth.uid);
      userActions.changeBookmarkData(this.props.userAuth.uid);
    } else { console.log('not logged in'); }
    userStore.addChangeListener(this.changeUserContent);
  }

  componentWillUnmount(){ userStore.removeChangeListener(this.changeUserContent); }

  render() {
    return (
      <Router>
        <Routes appState={this.state}/>
      </Router>
    );

  }

  changeUserContent(){
    console.log("app callback: changing user content");
    this.setState({
      userData: userStore.getUserData()
   });
  }

}

React.render(<App />, document.getElementById('app'));

