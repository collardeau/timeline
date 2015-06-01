require('normalize.css/normalize.css');
require('./styles/main.scss');

const React = require('react');

// top level components for layouts
let Navigation = require('./components/Navigation');
let Login = require('./components/login/Login');
let TimelineContainer = require('./components/timeline/TimelineContainer');
let BrowseContainer = require('./components/browse/BrowseContainer');

class App extends React.Component {

    render() {

      let browseRoute = (
        <div>
          <BrowseContainer user={ this.props.user } />
        </div>
      );

      let loginRoute = (
        <div>
          <Navigation />
          <Login />
        </div>
      );

      let timelineRoute = (
        <div>
          <TimelineContainer
            params={ this.props.params }
            user={ this.props.user }
          />
        </div>
      );

      let ui = null;

        switch(this.props.route) {

            case "browse":
                ui = browseRoute;
                break;

            case "login":
                ui = loginRoute;
                break;

            case "timeline":
                ui = timelineRoute;
                break;

            default:
              ui = browseRoute;
        }

        return ui;

    }
}

module.exports = App;
