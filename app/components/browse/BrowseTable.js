const React = require('react');

class BrowseTable extends React.Component {

  render() {
    return (
      <ul className="table-view">
        <li className="table-view-cell">
          <a className="navigate-right">
            Painters
          </a>
        </li>
        <li className="table-view-cell">
          <a className="navigate-right">
            Back to the Future
          </a>
        </li>
        <li className="table-view-cell">
          <a className="navigate-right">
            Major Wars
          </a>
        </li>
      </ul>
    );
  }
}
module.exports = BrowseTable;
