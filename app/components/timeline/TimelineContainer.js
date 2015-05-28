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
      addIsOpen: false
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

  handleToggle(){
    this.setState({
     addIsOpen: !this.state.addIsOpen
    });
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

                  <p>A Public Timeline curated  by Thomas Collardeau:<br />
                    <b>{ this.state.timeline.description }</b></p>

                  <button className="btn" onClick={this.handleToggle.bind(this)}>Add New Dot</button>

                  <TimelineAdd isOpen={ this.state.addIsOpen } toggle={this.handleToggle.bind(this)} />

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
