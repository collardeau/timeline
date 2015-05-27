const React = require('react');
const timelineActions = require('../../actions/timelineActions');
const hasher = require('hasher');

class TimelineForm extends React.Component {

  handleSubmit(e){
    e.preventDefault();
    let name = this.refs.name.getDOMNode().value;
    if(name) {
      let timeline = {
        name: name,
        privacy: this.refs.privacy.getDOMNode().checked
      };
      console.log(timeline);
      timelineActions.addTimeline(timeline);
      hasher.setHash("browse");
    }else {
      console.log("you haven't put in a name");
    }
  }

  handleRoute(route) {
    hasher.setHash(route);
  }

  render(){
    return (
      <div>
        <header className="bar bar-nav">
          <h1 className="title">New Timeline</h1>
          <button className="btn pull-right" onClick= { this.handleRoute.bind(this, "browse") }>Close</button>
        </header>
        <div className="content">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label className="content-padded">Timeline Name </label>
            <input ref="name" type="text" placeholder="New Timeline" />
            <input type="checkbox" ref="privacy">Make Public (disabled)</input>
          </form>
          <div className="bar bar-standard bar-footer-secondary">
              <button className="btn btn-block" onClick={ this.handleSubmit.bind(this) }>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = TimelineForm;
