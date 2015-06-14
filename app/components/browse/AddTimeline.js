const React = require("react");
const $ = require('jquery');
let timelineActions = require('../../actions/timelineActions');

class AddTimeline extends React.Component {

  constructor(){
    super();
    this.state = { warning: '' };
  }

  handleSubmit(){
    let name = this.refs.name.getDOMNode().value,
        desc = this.refs.description.getDOMNode().value,
        firstDot = {
          name: this.refs.firstDotName.getDOMNode().value,
          timestamp: this.refs.firstDotDate.getDOMNode().value //unix?
    };
    console.log(firstDot);

    if(name && desc) {
      let timeline = {
        name: name,
        description: desc,
        isPublic: this.refs.privacy.getDOMNode().checked,
        owner: this.props.userAuth.uid,
        ownerName: this.props.userData.username
      };
      // timelineActions.addTimeline(timeline);
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
            <p>Hey { this.props.userData.username }, create a brand new timeline.</p>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <input ref="name" type="text" placeholder="Timeline Name" />
              <input ref="description" type="text" placeholder="Timeline Description" />
              <input ref="privacy" type="checkbox" />
              <span>List Publicly</span>
            </form>
          </div>
          <div className='card'>
            <h5 className='content-padded'>First Dot</h5>
            <p className='content-padded'>Type in your first data point,
              <br /> you can add more later :)
            </p>
            <form className="input-group">
              <div className="input-row">
                <label>Name</label>
                <input ref='firstDotName' type="text" placeholder="dot (event) name" />
              </div>
              <div className="input-row">
                <label>Date</label>
                <input ref='firstDotDate' type="date" />
              </div>
           </form>
          </div>

            <div className="bar bar-standard bar-footer">
              <button className="btn btn-primary btn-block" onClick={ this.handleSubmit.bind(this) }>Create</button>
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
