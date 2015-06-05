const React = require('react');

let TimelineHeader = require('./TimelineHeader');
let Timeline = require('./Timeline');
let TimelineControls = require('./TimelineControls');
let TimelineAddDot = require('./TimelineAddDot');
let TimelineEdit = require('./TimelineEdit');
let timelineStore = require('../../stores/timelineStore');
let timelineActions = require('../../actions/timelineActions');

class TimelineContainer extends React.Component {

  constructor() {
    super();
    console.log("---------------");
    console.log("tl container: contructor");
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
    console.log("tl container: mount");
    timelineStore.addChangeListener(this.changeContent);
    timelineActions.loadTimeline(this.props.params[0]);
  }

  componentWillUnmount() {
    console.log("tl container: unmount");
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

            <p>{ this.state.timeline.description }.
              <br />
              A Public Timeline curated by
              <b> { this.state.timeline.ownerNickname }</b>.
            </p>

            { info }
            { dateToggle }

          </div>

          <Timeline dots={ this.state.timeline.dots || [] } />

          <TimelineAddDot timelineId = { this.props.params[0] }/>
          <TimelineEdit
            timeline = { this.state.timeline }
            timelineId = { this.props.params[0] }
          />
       </div>

      </div>
    );
  }

  changeContent() {
    console.log("timeline container callback: change content");
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
