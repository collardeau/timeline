import React from 'react';

let BrowseItem = require('./BrowseItem');

export default class BrowseTable extends React.Component {

  render() {

    let items = this.props.items.map(( item, i ) => {
      return <BrowseItem key={i} item={item} />;
    });

    return <ul className="table-view"> { items } </ul>;
  }

}

module.exports = BrowseTable;
