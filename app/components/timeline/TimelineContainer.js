const React = require('react');
let Timeline = require('./Timeline');
let TimelineControls = require('./TimelineControls');
let timelineStore = require('../../stores/timelineStore');
let timelineActions = require('../../actions/timelineActions');
let hasher = require('hasher');

class TimelineContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      timeline: null
    };
    this.changeContent = this.changeContent.bind(this);
  }

  componentWillMount(){
    let timelineId = this.props.params[0];
    console.log("dealing with this id: ", timelineId);
    this.state = {
      timeline: timelineStore.getTimeline(timelineId)
    };
  }

  componentDidMount() {
    timelineStore.addChangeListener(this.changeContent);
  }

  componentDidUnmount() {
    timelineStore.removeChangeListener(this.changeContent);
  }

  handleRoute(route) {
    console.log('handling routing for: ', route);
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

                  <p>
                    Birthdates of some great painters
                  </p>
                  <p>
                    Public Timeline by Thomas Collardeau
                  </p>

              </div>

              <Timeline dots={ this.state.timeline.dots } />

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
