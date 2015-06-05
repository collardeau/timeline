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
      activeTab: 'public',
      notice: ''
    };
    this.changeContent = this.changeContent.bind(this);
  }

  componentDidMount(){
    console.log("browse: mount");
    timelinesStore.addChangeListener(this.changeContent);
 }

  componentWillUnmount(){
    console.log('browse: unmount');
    timelinesStore.removeChangeListener(this.changeContent);
  }

  notify(notice) {
    this.setState({
      notice: notice
    });
  }

  handleCloseNotice(){
    this.setState({
      notice: ''
    });
  }

  filterTimelines(types) {
    this.setState({
      timelines: timelinesStore.getTimelines(types),
      activeTab: types
    });
  }

  render() {

    let notice = (
      <div className='flash-alert'>
        { this.state.notice }
        <i onClick={this.handleCloseNotice.bind(this) } className='pull-right fa fa-times-circle'></i>
      </div>
    );

    return (
      <div>

        <BrowseHeader
          isLoggedIn={ Boolean(this.props.userAuth) }
          notify = { this.notify.bind(this) }
        />

        <div className="content">

          { this.state.notice ? notice : '' }

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
