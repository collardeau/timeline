const React = require('react');
const $ = require('jquery');

let BrowseTable = require('./BrowseTable');
let BrowseControls = require('./BrowseControls');
let BrowseHeader = require('./BrowseHeader');
let AddTimeline = require('./AddTimeline');
let timelineStore = require('../../stores/timelineStore');
let timelineActions = require('../../actions/timelineActions');

class Browse extends React.Component {

  constructor(){
    super();
    console.log("--------------");
    console.log("browse: constructor");
    this.state = {
      timelines: timelineStore.getTimelines(),
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
    timelineStore.addChangeListener(this.changeContent);
 }

  componentWillUnmount(){
    console.log('browse: unmount');
    timelineStore.removeChangeListener(this.changeContent);
  }

  filterTimelines(types) {
    this.setState({
      timelines: timelineStore.getTimelines(types),
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
      timelines: timelineStore.getTimelines()
    });
  }
}

module.exports = Browse;
