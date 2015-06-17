const React = require('react');
const $ = require('jquery');

let BrowseHeader = require('./BrowseHeader');
let BrowseControls = require('./BrowseControls');
let BrowseTable = require('./BrowseTable');
let BrowseNotice = require('./BrowseNotice');
let AddTimeline = require('./AddTimeline');
let browseActions = require('../../actions/browseActions');
let browseStore = require('../../stores/browseStore');

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

  componentWillUnmount(){ browseStore.removeChangeListener(this.changeContent); }

  render() {

    let controls = (
      <BrowseControls active={ this.state.activeTab } userData={ this.props.userData } />
    );

    return (
      <div>
        <BrowseHeader isLoggedIn={ Boolean(this.props.userAuth) }/>
        <div className="content">

          { this.props.userAuth ? controls : '' }

          <BrowseNotice activeTab={this.state.activeTab} listLength={this.state.timelines.length}
            username = { this.props.userData.username } />

          <BrowseTable active={this.state.activeTab} timelines={this.state.timelines}/>

        </div>
        <AddTimeline userAuth={this.props.userAuth} userData={this.props.userData}/>
      </div>
    );
  }

  changeContent(){ console.log("browse callback: changing tab content");
    this.setState({ timelines: browseStore.getTimelines() });
    $('#timelines-loading').addClass('hidden');
  }

}

module.exports = Browse;
