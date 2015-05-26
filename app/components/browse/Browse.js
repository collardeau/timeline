const React = require('react');

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

          <div className="segmented-control">
            <a className="control-item active">Only Public</a>
            <a className="control-item">Only Mine</a>
            <a className="control-item">Bookmarks</a>
          </div>

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

        </div>

      </div>
    );
  }
}

module.exports = Browse;
