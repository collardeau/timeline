const React = require('react');
let BrowseTable = require('./BrowseTable');
let BrowseControls = require('./BrowseControls');

class Browse extends React.Component {

  constructor(){
    super();
    this.state = {
      filler: null
    };
  }

  render() {
    return (
      <div>
        <header className="bar bar-nav">
          <button className="btn pull-left">
            <i className="fa fa-bars"></i>
          </button>
          <h1 className="title">
            Browse
          </h1>
          <button className="btn pull-right">
            <i className="fa fa-plus"></i>
          </button>
        </header>

        <div className="content">

          <BrowseControls />

          <BrowseTable />

          </div>

      </div>
    );
  }
}

module.exports = Browse;
