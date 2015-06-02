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
    this.state = {
      timelines: [],
      activeTab: 'public'
    };
    this.changeContent = this.changeContent.bind(this);
  }

  componentDidMount(){
    timelineStore.addChangeListener(this.changeContent);
    timelineActions.changeTimelines();
 }

  componentWillUnmount(){
    timelineStore.removeChangeListener(this.changeContent);
  }

  filterTimelines(types) {
    this.setState({
      timelines: timelineStore.getTimelines(types),
      activeTab: types
    });
  }

  render() {
    return (
      <div>

        <BrowseHeader />

        <div className="content">

          <BrowseControls active={ this.state.activeTab } filterFn={ this.filterTimelines.bind(this) }/>

          <BrowseTable timelines={ this.state.timelines } />
          Hello { this.props.userData.nickname }

          </div>

          <AddTimeline user={this.props.user}/>

      </div>
    );
  }

  changeContent(){
    this.setState({
      timelines: timelineStore.getTimelines()
    });
  }
}

module.exports = Browse;
