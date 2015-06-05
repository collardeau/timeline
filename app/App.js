require('normalize.css/normalize.css');
require('./styles/main.scss');

const React = require('react');

// top level components for layouts
let Login = require('./components/login/Login');
let TimelineContainer = require('./components/timeline/TimelineContainer');
let BrowseContainer = require('./components/browse/BrowseContainer');
let timelineActions = require('./actions/timelineActions');

class App extends React.Component {

  componentDidMount(){
    console.log("**** app: mount");
    console.log('app: sync timelines');
    timelineActions.syncTimelines();
  }

    render() {

        switch(this.props.route) {

            case "browse":
              return (
                <div>
                  <BrowseContainer
                    userAuth={ this.props.userAuth }
                    userData = { this.props.userData }
                  />
                </div>
              );

            case "timeline":
              return (
                <div>
                  <TimelineContainer
                    params = { this.props.params }
                    userAuth = { this.props.userAuth }
                  />
                </div>

              );

            case "login":
              return (
                <div>
                  <Login />
                </div>
              );


            default:
              return (
                 <div>
                  <BrowseContainer
                    userAuth={ this.props.userAuth }
                    userData = { this.props.userData }
                  />
                </div>

            );
        }

    }
}

module.exports = App;
