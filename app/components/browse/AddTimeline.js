const React = require("react");
const $ = require('jquery');
const moment = require('moment');
const hasher = require('hasher');

let timelineActions = require('../../actions/timelineActions');
let timelinesStore = require('../../stores/timelinesStore');

class AddTimeline extends React.Component {

  constructor(){
    super();
    this.state = { warning: '' };
    this.newContent = this.newContent.bind(this);
  }

  componentDidMount(){
    timelinesStore.addNewListener(this.newContent);
  }

  componentWillUnmount(){
    timelinesStore.removeChangeListener(this.newContent);

  }

  handleSubmit(){
    let name = this.refs.name.getDOMNode().value,
        desc = this.refs.description.getDOMNode().value,
        firstDot = {
          name: this.refs.firstDotName.getDOMNode().value,
          timestamp: moment(this.refs.firstDotDate.getDOMNode().value).unix()
    },
        secondDot = {
          name: this.refs.secondDotName.getDOMNode().value,
          timestamp: moment(this.refs.secondDotDate.getDOMNode().value).unix()
    };

    if(name && desc // todo: create proper sanitizing utils
      && firstDot.name && firstDot.timestamp
      && secondDot.name && secondDot.timestamp ) {

      let timeline = {
        name: name,
        description: desc,
        isPublic: this.refs.privacy.getDOMNode().checked,
        owner: this.props.userAuth.uid,
        ownerName: this.props.userData.username,
        dots: [firstDot, secondDot]
      };

      timelineActions.addTimeline(timeline, tlId => {
        hasher.setHash('u/' + this.props.userData.username + "/" + tlId);

      });
      //this.closeModal();

    }else {
      if(!name){
      this.setState({ warning: 'Oops, name is missing' });
      }else if (!desc) {
        this.setState({ warning: 'Oops, description is missing' });
      }else {
        this.setState({ warning: 'Oops, invalid dot'});
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
          <h1 className="title">NEW TIMELINE</h1>
        </header>

        <div className="content">
          <div className="content-padded">
            { this.state.warning ? warning : '' }
            <p>Hey <b>{ this.props.userData.username }</b>, create a brand new timeline.</p>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <input ref="name" type="text" placeholder="Timeline Name" />
              <input ref="description" type="text" placeholder="Timeline Description" />
              <input ref="privacy" type="checkbox" />
              <span>List Publicly</span>
            </form>
          </div>

          <div className='card'>
            <h5 className='content-padded'>First Dot</h5>
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
          <div className='card'>
            <h5 className='content-padded'>Second Dot</h5>
            <form className="input-group">
              <div className="input-row">
                <label>Name</label>
                <input ref='secondDotName' type="text" placeholder="dot (event) name" />
              </div>
              <div className="input-row">
                <label>Date</label>
                <input ref='secondDotDate' type="date" />
              </div>
           </form>
          </div>
          <p className='content-padded'>No worries: you can add more dots later.</p>


            <div className="bar bar-standard bar-footer">
              <button className="btn btn-primary btn-block" onClick={ this.handleSubmit.bind(this) }>Create</button>
            </div>
        </div>

      </div>
    );
  }

  newContent(){
    let newId = timelinesStore.getNewest();
    hasher.setHash('u/' + this.props.userData.username + "/" + newId);
  };

}

AddTimeline.propTypes = {
  userAuth: React.PropTypes.instanceOf(Object),
  userData: React.PropTypes.instanceOf(Object)
};

module.exports = AddTimeline;
