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
      timelines: timelinesStore.getTimelines('public'),
      activeTab: 'public',
      notice: ''
    };
    this.changeContent = this.changeContent.bind(this);
  }

  componentDidMount(){
    console.log("browse: mount");
    timelinesStore.addChangeListener(this.changeContent);
    console.log('browse: sync timelines');

    $('#timelines-loading').removeClass('hidden');
    timelineActions.syncPublicTimelines();
    if (this.props.userAuth){
      console.log('app: browse  private timelines');
      timelineActions.syncTimelines(this.props.userAuth.uid);
    } else {
      console.log('not logged in');
    }

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

    let controls = (
      <BrowseControls active={ this.state.activeTab } filterFn={ this.filterTimelines.bind(this) }/>
    );

    let empty = (
      <p className='content-padded'>Hello <b>{ this.props.userData.nickname }</b>,
        <br />
        No timelines here. Start creating your own: Create <a>one</a>
      </p>
    );

    return (
      <div>

        <BrowseHeader
          isLoggedIn={ Boolean(this.props.userAuth) }
          notify = { this.notify.bind(this) }
        />

        <div className="content">

          { this.state.notice ? notice : '' }

          { this.props.userAuth ? controls : '' }

          Hello, { this.props.userData.username }
          <BrowseTable timelines={ this.state.timelines } />

          <p id='timelines-loading' className="content-padded hidden">
            <i className="fa fa-2x fa-spinner fa-spin"></i><br /> Loading...
          </p>

          { this.state.timelines.length || this.state.activeTab === 'public' ? '' : empty }

          </div>

          <AddTimeline userAuth={this.props.userAuth} userData={this.props.userData}/>

      </div>
    );
  }

  changeContent(){
    console.log("browse callback: changing content");
    if(this.state.activeTab === 'user'){
      this.setState({
        timelines: timelinesStore.getTimelines('user')
      });
    } else {
      this.setState({
        timelines: timelinesStore.getTimelines()
      });
    }
    $('#timelines-loading').addClass('hidden');
  }

}

module.exports = Browse;
