const React = require('react');
const $ = require('jquery');

let TimelineHeader = require('./TimelineHeader');
let Timeline = require('./Timeline');
let TimelineAddDot = require('./TimelineAddDot');
let TimelineEdit = require('./TimelineEdit');
let timelineStore = require('../../stores/timelineStore');
let timelineActions = require('../../actions/timelineActions');
let svgActions = require('../../actions/svgActions');

class TimelineContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      timeline: { dots: [], name: '', owner: '', isPublic: false },
      isBookmarked: false,
      bmCount: 0
    };
    this.changeContent = this.changeContent.bind(this);
  }

  componentDidMount() {
    $('#timelineSpinner').removeClass('hidden');
    console.log("tl container: mount");
    timelineStore.addChangeListener(this.changeContent);
    let owner = this.props.params[0],
        timelineId = this.props.params[1];
    timelineActions.loadTimeline(timelineId, owner);  // sync
  }

  componentWillUnmount() {
    console.log("tl container: unmount");
    timelineStore.removeChangeListener(this.changeContent);
  }

  handleBookmark(){
    let tlClone = JSON.parse(JSON.stringify(this.state.timeline));
    timelineActions.bookmarkTimeline(!this.state.isBookmarked, tlClone, this.props.params[1], this.props.userAuth.uid);
  }

  handleDateToggle(){
    svgActions.toggleDates();
  }

  render(){

    let isOwner = false;
    if ( this.props.userAuth && this.props.userAuth.uid === this.state.timeline.owner) {
      isOwner = true;
    }
    let dateToggle, info;
    let numDots = this.state.timeline.dots.length;
    let timelineId = this.props.params[1];

    if (numDots) {    // there are items in the timeline
      dateToggle = (
        <button className="btn" onClick = { this.handleDateToggle.bind(this) }>
          <i className="fa fa-calendar-o"></i>
        </button>
      );

      if(numDots === 1){
        info = <p>Only 1 item in this list</p>;
      }
    }else{
      info = <p>No item in this list!</p>;
    }

    let timelineInfo = (
      <div id='timelineInfo'>
        <div className='timelineDetails'>
          <h3> {this.state.timeline.name}</h3>
          <p> {this.state.timeline.description}.
            <br />Timeline curated by <b>{ this.state.timeline.ownerName}</b>.
          </p>

        { info }

      </div>

      <div onClick={this.handleBookmark.bind(this)} className='pull-right timelineBookmark'>
        { this.state.bmCount }
        <span> </span>
        { this.state.isBookmarked ? <i className='fa fa-2x fa-bookmark' /> : <i className='fa fa-2x fa-bookmark-o' />}
      </div>
    </div>
    );

    return (
      <div>

        <TimelineHeader />

        <div className="content">

          <p id='timelineSpinner' className="content-padded hidden">
            Fetching Timeline... <i className="fa fa-2x fa-spinner fa-spin pull-right"></i>
          </p>

          <div className="content-padded">

            { this.state.timeline.name ? timelineInfo : '' }
            { dateToggle }

          </div>

          <Timeline dots={ this.state.timeline.dots } />

          <p className='content-padded'>
            Hope you enjoyed the { this.state.timeline.name } visualization!<br />
            Give us some <a>feedback</a>
          </p>

          <TimelineAddDot
            timelineId = { timelineId }
            timelineOwner = { this.state.timeline.owner }
          />
          <TimelineEdit
            timeline = { this.state.timeline }
            timelineId = { timelineId }
          />
       </div>

      </div>
    );
  }

  changeContent() {
    this.setState({
      timeline: timelineStore.getTimeline(),
      bmCount: timelineStore.getBmCount(),
      isBookmarked: timelineStore.isBookmarked()
    });
    $('#timelineSpinner').addClass('hidden');
  }
}

TimelineContainer.propTypes = {
  userAuth: React.PropTypes.instanceOf(Object),
  params: React.PropTypes.array
};

module.exports = TimelineContainer;
