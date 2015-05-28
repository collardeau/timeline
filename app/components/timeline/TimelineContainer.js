const React = require('react');
//const $ = require('jquery');
const hasher = require('hasher');

let Timeline = require('./Timeline');
let TimelineControls = require('./TimelineControls');
let TimelineAdd = require('./TimelineAdd');
let timelineStore = require('../../stores/timelineStore');
let timelineActions = require('../../actions/timelineActions');

class TimelineContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      timeline: null,
      addIsOpen: true   // need to implement toggle
    };
    this.changeContent = this.changeContent.bind(this);
  }

  componentWillMount(){
    let timelineId = this.props.params[0];
    console.log("dealing with this id: ", timelineId);
    this.setState({
      timeline: timelineStore.getTimeline(timelineId)
    });
  }

  componentDidMount() {
    timelineStore.addChangeListener(this.changeContent);
  }

  componentDidUnmount() {
    timelineStore.removeChangeListener(this.changeContent);
  }

  handleRoute(route) {
    hasher.setHash(route);
  }

  render(){

    return (
         <div id="tbd">

            <header className="bar bar-nav">
              <button className="btn pull-left" onClick={this.handleRoute.bind(this, "browse") }>
                <i className="fa fa-chevron-left"></i>
              </button>
              <h1 className="title">
                { this.state.timeline.name }
              </h1>
            </header>

              <div className="content">

                <TimelineControls />

                <div className="content-padded">

                  <p>Public Timeline by Thomas Collardeau</p>
                  <p>Birthdates of some great painters</p>

                  <TimelineAdd isOpen={ this.state.addIsOpen } />

                </div>

              <Timeline dots={ this.state.timeline.dots || [] } />

            </div>

          </div>
    );
  }

  changeContent() {
    this.setState({
      timeline: timelineStore.getTimeline()
    });
  }

}

module.exports = TimelineContainer;
