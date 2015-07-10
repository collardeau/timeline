const React = require('react');

class BrowseItem extends React.Component {

  render() {

    let { item } = this.props;

    return (

      <li className="table-view-cell timeline">
        { item.name }
        <br />
        <small>by { item.ownerName }</small>
      </li>
    );

  }

}

module.exports = BrowseItem;
