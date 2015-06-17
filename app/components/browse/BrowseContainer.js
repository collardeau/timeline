const React = require('react');
const $ = require('jquery');

let BrowseHeader = require('./BrowseHeader');
let BrowseControls = require('./BrowseControls');
let BrowseItem = require('./BrowseItem');
let AddTimeline = require('./AddTimeline');
// let timelinesStore = require('../../stores/timelinesStore');
let userTimelinesStore = require('../../stores/userTimelinesStore');
let bookmarkTimelinesStore = require('../../stores/bookmarkTimelinesStore');
let publicTimelinesStore = require('../../stores/publicTimelinesStore');

let BrowseNotice = require('./BrowseNotice');

// let timelineActions = require('../../actions/timelineActions');
let browseActions = require('../../actions/browseActions');
// let bmActions = require('../../actions/bmActions');

class Browse extends React.Component {

  constructor(){
    super();
    console.log('---------');
    this.state = {
      timelines: [],
      activeTab: 'public'
    };

    this.changeContent = this.changeContent.bind(this);
  }

  componentDidMount(){
    publicTimelinesStore.addChangeListener(this.changeContent);
    userTimelinesStore.addChangeListener(this.changeContent);
    bookmarkTimelinesStore.addChangeListener(this.changeContent);
    $('#timelines-loading').removeClass('hidden');
    browseActions.syncTimelines(this.props.userAuth);
  }

  componentWillUnmount(){
    publicTimelinesStore.removeChangeListener(this.changeContent);
    userTimelinesStore.removeChangeListener(this.changeContent);
    bookmarkTimelinesStore.removeChangeListener(this.changeContent);
  }

  filterTimelines(types) {
    console.log('filtering for: ', types);
    let store = this.getStore(types);
    this.setState({
      activeTab: types,
      timelines: store.getTimelines()
    });
    console.log("state now is: ", this.state);
  }

  render() {

    let controls = (
      <BrowseControls active={ this.state.activeTab }
        filterFn={ this.filterTimelines.bind(this) }
        userData={ this.props.userData }
      />
    );

    let timelines = this.state.timelines.map(( t, i ) => {
      return (
        <BrowseItem timeline={t} key={t.key} />
      );
    });

    return (
      <div>

        <BrowseHeader isLoggedIn={ Boolean(this.props.userAuth) }/>

        <div className="content">

          { this.props.userAuth ? controls : '' }

          <BrowseNotice activeTab={this.state.activeTab} listLength={this.state.timelines.length}
            username = { this.props.userData.username } />

          <ul className="table-view"> { timelines } </ul>

          </div>

          <AddTimeline userAuth={this.props.userAuth} userData={this.props.userData}/>

      </div>
    );
  }

  getStore(tab = this.state.activeTab) {
    console.log('get store: ', tab);
    return tab === 'user' ? publicTimelinesStore :
      tab === 'bookmarks' ? bookmarkTimelinesStore : publicTimelinesStore;
  }

  changeContent(){ console.log("browse callback: changing tab content");
    let store = this.getStore();
    let tab = this.state.activeTab;
    if(tab === 'user'){ store = userTimelinesStore; }
    if(tab === 'bookmarks') { store = bookmarkTimelinesStore; }
    this.setState({ timelines: store.getTimelines() });
    $('#timelines-loading').addClass('hidden');
  }

}

module.exports = Browse;
