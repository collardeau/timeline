const React = require('react');
const hasher = require('hasher');

class BrowseTable extends React.Component {

  handleLink(route) {
    hasher.setHash(route);
  }

  handleTimelineLink(timeline){
    hasher.setHash('u/' + timeline.ownerName + '/' + timeline.key);
  }

  render() {

    let timelines = this.props.timelines.map(( t, i ) => {
      return (
        <li key={i} className="table-view-cell">
          <a onClick={this.handleTimelineLink.bind(this, t )} >
            { t.name }
          </a>
          <small>by { t.ownerName }</small>
          <span className='badge'>0</span>
        </li>
      );
    });

    return (
      <ul className="table-view">
        { timelines }
      </ul>
    );
  }
}

module.exports = BrowseTable;
