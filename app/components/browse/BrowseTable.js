const React = require('react');
const hasher = require('hasher');

class BrowseTable extends React.Component {

  handleLink(route) {
    hasher.setHash(route);
  }

  handleTimelineLink(id){
    console.log("handling link to timeline id: ", id);
    hasher.setHash('timeline/' + id);
  }

  render() {

    let timelines = this.props.timelines.map(( t, i ) => {
      return (
        <li key={i} className="table-view-cell">
          <a className="navigate-right"
            onClick={this.handleTimelineLink.bind(this, t.key )} >
            { t.name }
          </a>
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
