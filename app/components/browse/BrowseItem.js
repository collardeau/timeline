const React = require('react');
const hasher = require('hasher');

let bmActions = require('../../actions/bmActions.js');
let bmStore = require('../../stores/bmStore');

class BrowseItem extends React.Component {

  constructor(){
    super();
    this.state = { bmCount: 0 };
    this.changeContent = this.changeContent.bind(this);
  }

  componentDidMount(){
    console.log('browse item: mount');
    bmStore.addChangeListener(this.changeContent);
    bmActions.changeBm(this.props.timeline.key);
    // should not request new sync everytime it mounts
    // or change content only if count doenst already exists
  }

  // component should update?

  componentWillUnmount(){
    console.log('browse item: unmount')
    bmStore.removeChangeListener(this.changeContent);
  }

  handleTimelineLink(){
    hasher.setHash('u/' + this.props.timeline.ownerName + '/' + this.props.timeline.key);
  }

  render() {

    let t = this.props.timeline;

    return (

      <li onClick={this.handleTimelineLink.bind(this)} className="table-view-cell timeline">
        { t.name }
        <br />
        <small>by { t.ownerName }</small>
        <span className='badge'>{ this.state.bmCount }</span>
      </li>
    );

  }

  changeContent(){
    // console.log('browse item: change content (check)');
    this.setState({
      bmCount: bmStore.getBmCount(this.props.timeline.key)
    });
  }
}

module.exports = BrowseItem;
