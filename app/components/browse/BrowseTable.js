const React = require('react');

class BrowseTable extends React.Component {

  render() {

    let timelines = this.props.timelines.map(( t, i ) => {
      return (
        <li key={i} className="table-view-cell">
          <a className="navigate-right">
            { t }
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
