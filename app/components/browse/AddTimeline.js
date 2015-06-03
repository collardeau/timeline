const React = require("react");
const $ = require('jquery');
let timelineActions = require('../../actions/timelineActions');

class AddTimeline extends React.Component {

  constructor(){
    super();
    this.state = { warning: '' };
  }

  handleSubmit(){
    let name = this.refs.name.getDOMNode().value;
    let desc = this.refs.description.getDOMNode().value;

    if(name && desc) {
      let timeline = {
        name: name,
        description: desc,
        isPublic: this.refs.privacy.getDOMNode().checked,
        owner: this.props.userAuth.uid,
        ownerNickname: this.props.userData.nickname
      };
      timelineActions.addTimeline(timeline);
      this.closeModal();
    }else {
      if(!name){
      this.setState({ warning: 'Oops, name is missing' });
      }else {
        this.setState({ warning: 'Oops, description is missing' });
      }
    }
  }

  closeModal() {
    this.setState({ warning: '' });
    $('#addTimelineModal').removeClass('active');
    this.refs.name.getDOMNode().value = '';
    this.refs.description.getDOMNode().value = '';
  }

  render(){

    var warning = (
      <div className="flash-error">
        <span>{ this.state.warning }</span>
      </div>
    );

    return (
      <div id="addTimelineModal" className="modal">
        <header className="bar bar-nav">
          <a onClick={this.closeModal.bind(this)} className="closeModal icon icon-close pull-right"></a>
          <h1 className="title">Add New Timeline </h1>
        </header>

        <div className="content">
          <div className="content-padded">
            { this.state.warning ? warning : '' }
            <form onSubmit={this.handleSubmit.bind(this)}>
              <input ref="name" type="text" placeholder="Name" />
              <input ref="description" type="text" placeholder="Description" />
              <span>Make it open to public?</span>
              <label className="label-switch pull-right">
                <input ref="privacy" type="checkbox" />
                <div className="checkbox"></div>
              </label>
            </form>

          </div>
            <div className="bar bar-standard bar-footer">
              <button className="btn btn-primary btn-outlined btn-block" onClick={ this.handleSubmit.bind(this) }>Create</button>
            </div>
        </div>

      </div>
    );
  }
}

AddTimeline.propTypes = {
  userAuth: React.PropTypes.instanceOf(Object),
  userData: React.PropTypes.instanceOf(Object)
};

module.exports = AddTimeline;
