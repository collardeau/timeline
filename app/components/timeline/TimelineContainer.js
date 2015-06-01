const React = require('react');

let TimelineHeader = require('./TimelineHeader');
let Timeline = require('./Timeline');
let TimelineControls = require('./TimelineControls');
let TimelineAdd = require('./TimelineAdd');
let timelineStore = require('../../stores/timelineStore');
let timelineActions = require('../../actions/timelineActions');

let authUtils = require('../../utils/authUtils');

class TimelineContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      timeline: {
        name: "Timeline",
        description: "loading...",
        owner: "",
        dots: []
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

  handleFormToggle(){   // add new dot form
    this.setState({
     addIsOpen: !this.state.addIsOpen
    });
  }

  handleDateToggle(){
    timelineActions.toggleDates();
  }

  render(){

    let isOwner = authUtils.isLoggedIn().uid === this.state.timeline.owner ? true : false;

    let dateToggle;
    if( this.state.timeline.dots.length){
      dateToggle = <button className="btn" onClick = { this.handleDateToggle.bind(this) }>View Dates</button>;
    }

    return (
      <div>

        <TimelineHeader />

        <div className="content">

          <TimelineControls owner={ isOwner } />

          <div className="content-padded">

            <h4>{ this.state.timeline.name }</h4>

            <p>{ this.state.timeline.description }</p>
            <p>A Public Timeline curated by
              { this.state.timeline.owner }</p>

            { dateToggle }

            <button className="btn"
              onClick={this.handleFormToggle.bind(this)}>
              Add New Dot
            </button>

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
