const React = require('react');
const $ = require('jquery');

let TimelineHeader = require('./TimelineHeader');
let TimelineControls = require('./TimelineControls');
let TimelineInfo = require('./TimelineInfo');
let Timeline = require('./Timeline');
let TimelineAddDot = require('./TimelineAddDot');
let TimelineEdit = require('./TimelineEdit');
let timelineStore = require('../../stores/timelineStore');
//let bmStore = require('../../stores/bmStore');
let timelineActions = require('../../actions/timelineActions');
let svgActions = require('../../actions/svgActions');

class TimelineContainer extends React.Component {

  constructor() { super(); console.log('-------');
    this.state = { timeline: timelineStore.getTimeline() };
    this.changeContent = this.changeContent.bind(this);
  }

  componentDidMount() { console.log("timeline container did mount");
    $('#timelineSpinner').removeClass('hidden');
    timelineStore.addChangeListener(this.changeContent);
    timelineActions.loadTimeline(this.props.params[1], this.props.params[0]);  // sync
  }

  componentWillUnmount() { console.log("tl container: unmount");
    timelineStore.removeChangeListener(this.changeContent);
    timelineActions.killTlSync(this.props.params[1], this.state.timeline.owner);
  }

  handleDateToggle(){ svgActions.toggleDates(); }

  render(){

    // let isOwner = false;
    // if ( this.props.userAuth && this.props.userAuth.uid === this.state.timeline.owner) { isOwner = true; }
    let dateToggle;
    let numDots = this.state.timeline.dots.length;
    let timelineId = this.props.params[1];

    if (numDots) {    // there are items in the timeline
      dateToggle = (
        <button className="btn" onClick = { this.handleDateToggle.bind(this) }>
          <i className="fa fa-calendar-o"></i> Toggle Dates
        </button>
      );
    }

    return (
      <div>
        <TimelineHeader />
        <div className="content">
          <p id='timelineSpinner' className="content-padded hidden">
            Fetching Timeline... <i className="fa fa-2x fa-spinner fa-spin pull-right"></i>
          </p>
          <TimelineInfo timeline={this.state.timeline} tlId = { timelineId } />
          <div className="content-padded">
            { dateToggle }
          </div>
          <Timeline dots={ this.state.timeline.dots } />
          <p className='content-padded'>
            Hope you enjoyed the { this.state.timeline.name } visualization!<br />
            Give us some <a>feedback</a>
          </p>
          <TimelineAddDot timelineId = { timelineId } timelineOwner = { this.state.timeline.owner } />
          <TimelineEdit timeline = { this.state.timeline } timelineId = { timelineId } />
       </div>
      </div>
    );
  }

  changeContent() {
    this.setState({ timeline: timelineStore.getTimeline() });
    $('#timelineSpinner').addClass('hidden');
  }
}

TimelineContainer.propTypes = {
  userAuth: React.PropTypes.instanceOf(Object),
  params: React.PropTypes.array
};

module.exports = TimelineContainer;
