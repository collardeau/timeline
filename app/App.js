require('normalize.css/normalize.css');
require('./styles/main.scss');

const React = require('react');

// top level components for layouts
let Navigation = require('./components/Navigation');
let Home = require('./components/Home');
let ListContainer = require('./components/list/ListContainer');

let Login = require('./components/login/Login');
let Account = require('./components/Account');
let Timeline = require('./components/timeline/Timeline');

class App extends React.Component {

    render() {

        let ui = null;

        switch(this.props.route) {

            case "home":
                ui = homeRoute;
                break;

            case "login":
                ui = loginRoute;
                break;

            case "account":
                ui = accountRoute;
                break;

            case "timeline":
                ui = timelineRoute;
                break;

            default:
                ui = timelineRoute;
        }

        return ui ;

    }
}

let homeRoute = (
    <div>
    <Navigation />
    <Home />
    </div>
);

let listRoute = (
    <div>
    <Navigation />
    <ListContainer />
    </div>
);

let loginRoute = (
    <div>
    <Navigation />
    <Login />
    </div>
);

let accountRoute = (
    <div>
    <Navigation />
    <Account />
    </div>
);

let timelineRoute = (
    <div>
    <Navigation />
    <Timeline />
    </div>
);

module.exports = App;
