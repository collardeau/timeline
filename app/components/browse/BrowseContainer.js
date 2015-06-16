const React = require('react');
const $ = require('jquery');

let BrowseHeader = require('./BrowseHeader');
let BrowseControls = require('./BrowseControls');
let BrowseItem = require('./BrowseItem');
let AddTimeline = require('./AddTimeline');
let timelinesStore = require('../../stores/timelinesStore');
let timelineActions = require('../../actions/timelineActions');
let bmActions = require('../../actions/bmActions');

class Browse extends React.Component {

  constructor(){
    super();
    console.log('---------');
    this.state = {
      timelines: timelinesStore.getTimelines('public'),
      activeTab: 'public',
      notice: ''
    };
    this.changeContent = this.changeContent.bind(this);
  }

  componentDidMount(){

    timelinesStore.addChangeListener(this.changeContent);
    $('#timelines-loading').removeClass('hidden');

    timelineActions.syncPublicTimelines();

    if (this.props.userAuth){
      timelineActions.initUserTimelineData(this.props.userAuth.uid);
    } else { console.log('not logged in for user timeline data'); }

      }

  componentWillUpdate(){
let ids = this.state.timelines.map(t => { return t.key; });
    console.log(ids);
    bmActions.changeBmCounts(ids);


  }

  componentWillUnmount(){
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
      <BrowseControls
        active={ this.state.activeTab }
        filterFn={ this.filterTimelines.bind(this) }
        userData={ this.props.userData }
      />
    );

    let empty = (
      <div className='content-padded'>
        <p>Greetings, great <b>{ this.props.userData.username }</b>,</p>
        <p> There are <b>no timelines here</b>, dear friend.<br />
          You can browse the public timelines, bookmark your favorites, or create your own (private or public) timelines.
        </p>
      </div>
    );

    let timelines = this.state.timelines.map(( t, i ) => {
      return (
        <BrowseItem timeline={t} key={t.key} />
      );
    });


    return (
      <div>

        <BrowseHeader
          isLoggedIn={ Boolean(this.props.userAuth) }
          notify = { this.notify.bind(this) }
        />

        <div className="content">

          { this.state.notice ? notice : '' }

          { this.props.userAuth ? controls : '' }

          <ul className="table-view">
            { timelines }
          </ul>

          <p id='timelines-loading' className="content-padded hidden">
            Fetching Timeline... <i className="fa fa-2x fa-spinner fa-spin pull-right"></i>
          </p>


          { this.state.timelines.length || this.state.activeTab === 'public' ? '' : empty }

          </div>

          <AddTimeline userAuth={this.props.userAuth} userData={this.props.userData}/>

      </div>
    );
  }

  changeContent(){
    console.log("browse callback: changing tab content");
    if(this.state.activeTab === 'user'){
      this.setState({ timelines: timelinesStore.getTimelines('user') });
    } else if ( this.state.activeTab === 'bookmarks') {
      this.setState({ timelines: timelinesStore.getTimelines('bookmarks')});
    } else {
      this.setState({ timelines: timelinesStore.getTimelines() });
    }
    $('#timelines-loading').addClass('hidden');
  }

}

module.exports = Browse;
