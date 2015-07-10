const React = require('react');

class BrowseItem extends React.Component {

  handleClick(){
    let { ownerName, key } = this.props.item;
    window.location.hash = 'user/tonton/item/123';
  }

  render() {

    let { item } = this.props;

    return (

      <li className="table-view-cell" onClick={this.handleClick.bind(this)}>
        { item.name }
        <br />
        <small>by { item.ownerName }</small>
      </li>
    );

  }

}

module.exports = BrowseItem;
