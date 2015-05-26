const React = require('react');
const hasher = require('hasher');

class BrowseTable extends React.Component {

  handleLink(route) {
    hasher.setHash(route);
  }

  render() {

    let timelines = this.props.timelines.map(( t, i ) => {
      return (
        <li key={i} className="table-view-cell">
          <a className="navigate-right"
            onClick={this.handleLink.bind(this, 'timeline')} >
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
