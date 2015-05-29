const React = require('react');
const timelineActions = require('../../actions/timelineActions');
const hasher = require('hasher');

class TimelineForm extends React.Component {

  handleSubmit(e){
    e.preventDefault();
    let name = this.refs.name.getDOMNode().value;
    let desc = this.refs.description.getDOMNode().value;

    if(name) {  // pretty weak error checking
      let timeline = {
        name: name,
        description: desc,
        isPublic: this.refs.privacy.getDOMNode().checked
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
          <div className="content-padded">

          <form onSubmit={this.handleSubmit.bind(this)}>
            <input ref="name" type="text" placeholder="Name" />
            <input ref="description" type="text" placeholder="Description" />
            <label className="label-switch">
              Make Public?
               <input ref="privacy" type="checkbox" />
              <div className="checkbox"></div>
            </label>
          </form>

        </div>
          <div className="bar bar-standard bar-footer-secondary">
              <button className="btn btn-block" onClick={ this.handleSubmit.bind(this) }>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = TimelineForm;
