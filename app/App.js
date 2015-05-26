require('normalize.css/normalize.css');
require('./styles/main.scss');

const React = require('react');

// top level components for layouts
let Navigation = require('./components/Navigation');
let Login = require('./components/login/Login');
let Timeline = require('./components/timeline/Timeline');
let Browse = require('./components/browse/Browse');

class App extends React.Component {

    render() {

      let browseRoute = (
        <div>
          <Browse />
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
          <Timeline params={this.props.params} />
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
