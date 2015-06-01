const React = require("react");
const $ = require('jquery');
let timelineActions = require('../../actions/timelineActions');

class AddTimeline extends React.Component {

  handleSubmit(e){
    e.preventDefault();
    let name = this.refs.name.getDOMNode().value;
    let desc = this.refs.description.getDOMNode().value;

    if(name) {  // pretty weak error checking
      let timeline = {
        name: name,
        description: desc,
        isPublic: this.refs.privacy.getDOMNode().checked,
        owner: this.props.user.uid
      };
      timelineActions.addTimeline(timeline);
      this.closeModal();
    }else {
      console.log("you haven't put in a name");
    }
  }

  closeModal() {
    $('#addTimelineModal').removeClass('active');
  }

  render(){
    return (
      <div id="addTimelineModal" className="modal">
        <header className="bar bar-nav">
          <a onClick={this.closeModal} className="closeModal icon icon-close pull-right"></a>
          <h1 className="title">Add New Timeline </h1>
        </header>

        <div className="content">
          <div className="content-padded">
            <p>Insert a new timeline</p>
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

AddTimeline.propTypes = {
  user: React.PropTypes.instanceOf(Object)
};

module.exports = AddTimeline;
