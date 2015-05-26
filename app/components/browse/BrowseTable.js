const React = require('react');

class BrowseTable extends React.Component {

  render() {

    let timelines = this.props.timelines.map((t) => {
      return (
        <li className="table-view-cell">
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
