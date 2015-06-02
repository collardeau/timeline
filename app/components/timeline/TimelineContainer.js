const React = require('react');

let TimelineHeader = require('./TimelineHeader');
let Timeline = require('./Timeline');
let TimelineControls = require('./TimelineControls');
let TimelineAddDot = require('./TimelineAddDot');
let timelineStore = require('../../stores/timelineStore');
let timelineActions = require('../../actions/timelineActions');

class TimelineContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      timeline: {
        name: "Timeline",
        description: "loading...",
        owner: "",
        ownerNickname: "",
        dots: []
      }
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

  handleDateToggle(){
    timelineActions.toggleDates();
  }

  render(){

    let isOwner = false;
    if ( this.props.userAuth && this.props.userAuth.uid === this.state.timeline.owner) {
      isOwner = true;
    }
    let dateToggle, info;
    let numDots = this.state.timeline.dots.length;

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

    return (
      <div>

        <TimelineHeader />

        <div className="content">

          <TimelineControls owner={ isOwner } />

          <div className="content-padded">

            <h4>{ this.state.timeline.name }</h4>

            <p>{ this.state.timeline.description }</p>
            <p> A Public Timeline curated by { this.state.timeline.ownerNickname }</p>

            { info }
            { dateToggle }

          </div>

          <Timeline dots={ this.state.timeline.dots || [] } />

          <TimelineAddDot timelineId = { this.props.params[0] }/>
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

TimelineContainer.propTypes = {
  userAuth: React.PropTypes.instanceOf(Object),
  params: React.PropTypes.array
};

module.exports = TimelineContainer;
