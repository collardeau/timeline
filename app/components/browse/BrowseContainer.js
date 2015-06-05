const React = require('react');
const $ = require('jquery');

let BrowseTable = require('./BrowseTable');
let BrowseControls = require('./BrowseControls');
let BrowseHeader = require('./BrowseHeader');
let AddTimeline = require('./AddTimeline');
let timelinesStore = require('../../stores/timelinesStore');
let timelineActions = require('../../actions/timelineActions');

class Browse extends React.Component {

  constructor(){
    super();
    console.log("--------------");
    console.log("browse: constructor");
    this.state = {
      timelines: timelinesStore.getTimelines(),
      activeTab: 'public'
    };
    this.changeContent = this.changeContent.bind(this);
  }

  componentWillMount(){
    console.log("browse: will mount");
    //timelineActions.changeTimelines();
  }

  componentDidMount(){
    console.log("browse: mount");
    timelinesStore.addChangeListener(this.changeContent);
 }

  componentWillUnmount(){
    console.log('browse: unmount');
    timelinesStore.removeChangeListener(this.changeContent);
  }

  filterTimelines(types) {
    this.setState({
      timelines: timelinesStore.getTimelines(types),
      activeTab: types
    });
  }

  render() {
    console.log('browse: render');
    return (
      <div>

        <BrowseHeader />

        <div className="content">

          <BrowseControls active={ this.state.activeTab } filterFn={ this.filterTimelines.bind(this) }/>

          <BrowseTable timelines={ this.state.timelines } />
          <p className="content-padded">Hello { this.props.userData.nickname }</p>

          </div>

          <AddTimeline userAuth={this.props.userAuth} userData={this.props.userData}/>

      </div>
    );
  }

  changeContent(){
    console.log("browse callback: changing content");
    this.setState({
      timelines: timelinesStore.getTimelines()
    });
  }
}

module.exports = Browse;
