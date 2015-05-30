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
      timeline: {
        name: "Timeline",
        description: "loading..."
      },
      addIsOpen: false
    };
    this.changeContent = this.changeContent.bind(this);
  }

  componentDidMount() {
    timelineStore.addChangeListener(this.changeContent);
    timelineActions.loadTimeline(this.props.params[0]);
  }

  componentWillUnmount() {
    timelineStore.removeChangeListener(this.changeContent);
  }

  handleRoute(route) {
    hasher.setHash(route);
  }

  handleFormToggle(){   // add new dot form
    this.setState({
     addIsOpen: !this.state.addIsOpen
    });
  }

  handleDateToggle(){
    timelineActions.toggleDates();
  }

  render(){
    console.log("rendering timeline container");
    console.log(this.state);

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

                  <h5>{ this.state.timeline.description }</h5>
                  <p>A Public Timeline curated  by Thomas Collardeau</p>

                  <button className="btn" onClick = { this.handleDateToggle.bind(this) }>View Dates</button>
                  <button className="btn" onClick={this.handleFormToggle.bind(this)}>Add New Dot</button>

                  <TimelineAdd isOpen={ this.state.addIsOpen }
                    timelineId= { this.props.params[0] }
                    toggle={this.handleFormToggle.bind(this)} />

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
