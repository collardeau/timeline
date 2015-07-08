const React = require('react');
const $ = require('jquery');

let BrowseHeader = require('./BrowseHeader');
let BrowseControls = require('./BrowseControls');
let BrowseTable = require('./BrowseTable');
let BrowseNotice = require('./BrowseNotice');
let AddTimeline = require('./AddTimeline');
let browseActions = require('../../actions/browseActions');
let bmActions = require('../../actions/bmActions');
let browseStore = require('../../stores/browseStore');
let bmStore = require('../../stores/bmStore');

class Browse extends React.Component {

  constructor(){
    super(); console.log('---------');
    this.state = { timelines: [], activeTab: 'public' };
    this.changeContent = this.changeContent.bind(this);
  }

  componentDidMount(){
    browseStore.addChangeListener(this.changeContent);
    $('#timelines-loading').removeClass('hidden');
    browseActions.syncTimelines(this.props.userAuth); // this also kicks off filter public
  }

  componentDidUpdate(){
    bmActions.syncBmCounts(this.state.timelines.map((t) => { return t.key; } ));
  }

  componentWillUnmount(){
    browseStore.removeChangeListener(this.changeContent);
    bmActions.killBmCounts(bmStore.getAll());
  }

  render() {

    let { username, auth } = this.props;

    let controls = (
      <BrowseControls active={ this.state.activeTab } userData={ this.props.userData } />
    );

    return (
      <div>
        <BrowseHeader isLoggedIn={ Boolean(auth) }/>
        <div className="content">

          { this.props.username }

          { this.props.userAuth ? controls : '' }

          <BrowseNotice activeTab={this.state.activeTab} listLength={this.state.timelines.length}
            username = { username } />

          <BrowseTable active={this.state.activeTab} timelines={this.state.timelines}/>

        </div>
      </div>
    );
  }

  //<AddTimeline userAuth={auth} userData={username}/>

  changeContent(){ console.log("browse callback: changing tab content");
    this.setState({
      timelines: browseStore.getTimelines(),
      activeTab: browseStore.getActive()
    });
    $('#timelines-loading').addClass('hidden');
  }

}

module.exports = Browse;
