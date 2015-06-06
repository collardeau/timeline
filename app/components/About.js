const React = require('react');
const hasher = require('hasher');

class About extends React.Component {

  handleRoute(route){
    hasher.setHash(route);
  }

  render(){
    return (
      <div>
        <header className="bar bar-nav">
          <button className="btn pull-left" onClick={this.handleRoute.bind(this, "browse") }>
            <i className='fa fa-home'></i>
          </button>
          <h1 className="title">About</h1>
        </header>

        <div className="content">
          <div className="content-padded">
            <h1>Timelines</h1>
            <p>Available in the web browser.</p>
            <h5>Latest Updates</h5>
            <ul>
              <li>Version 1:<br />
                alpha launch <small>June 15th, 2015</small></li>
            </ul>
            <h5>Location</h5>
            <p>Made with passion and diligence at:</p>
            <address>
              Mobile Suite<br />
              Pappelallee 78<br />
              10437 Berlin
            </address>
            <h5>Contact</h5>
            <a>info@collardeau.com</a>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = About;

