const React = require('react');
const $ = require('jquery');

let BrowseTable = require('./BrowseTable');
let BrowseControls = require('./BrowseControls');
let BrowseHeader = require('./BrowseHeader');
let timelineStore = require('../../stores/timelineStore');
let timelineActions = require('../../actions/timelineActions');

class Browse extends React.Component {

  constructor(){
    super();
    this.state = {
      timelines: []
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
      timelines: timelineStore.getTimelines(types)
    });
  }

  render() {
    return (
      <div>

        <BrowseHeader />

        <div className="content">

          <BrowseControls yo="bar" filterFn={ this.filterTimelines.bind(this) }/>

          <BrowseTable timelines={ this.state.timelines } />

          </div>

      </div>
    );
  }

  changeContent(){
    console.log("changing state");
    this.setState({
      timelines: timelineStore.getTimelines()
    });
  }
}

module.exports = Browse;
