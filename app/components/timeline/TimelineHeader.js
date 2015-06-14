const React = require('react');
const hasher = require('hasher');

class TimelineHeader extends React.Component {

  handleRoute(route) {
    hasher.setHash(route);
  }

  render(){

    return (

      <header className="bar bar-nav">

          <button className="btn pull-left" onClick={this.handleRoute.bind(this, "browse") }>
            <i className="fa fa-chevron-left"></i>
          </button>

          <h1 className="title">
            TIMELINE
          </h1>

      </header>
   );
  }

}

module.exports = TimelineHeader;
