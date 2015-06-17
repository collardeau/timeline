const React = require('react');
let userStore = require('../../stores/userStore.js');

class BrowseNotice extends React.Component {

  constructor(){ super();
    this.state = { notice: '' };
    this.changeNotice = this.changeNotice.bind(this);
  }

  componentDidMount() {
    console.log('browse notice: mount');
    userStore.addChangeListener(this.changeNotice);
  }

  componentWillUnmount(){
    userStore.removeChangeListener(this.changeNotice);
  }

  handleCloseNotice(){ this.setState({ notice: '' }); }

  render() {

    let notice = (
      <div className='flash-alert'>
        { this.state.notice }
        <i onClick={this.handleCloseNotice.bind(this) } className='pull-right fa fa-times-circle'></i>
      </div>
    );

    let empty = (
      <div className='content-padded'>
        <p>Greetings, great <b>{ this.props.username }</b>,</p>
        <p> There are <b>no timelines here</b>, dear friend.<br />
          You can browse the public timelines, bookmark your favorites, or create your own (private or public) timelines.
        </p>
      </div>
    );

    return (
      <div>
        { this.state.notice ? notice : '' }
        <p id='timelines-loading' className="content-padded hidden">
          Fetching Timeline... <i className="fa fa-2x fa-spinner fa-spin pull-right"></i>
        </p>
        { this.props.listLength || this.props.activeTab === 'public' ? '' : empty }
      </div>
    );
  }

  changeNotice(){ console.log("notice cb: changing notice");
    this.setState({ notice: userStore.getNotice()});
  }

}

module.exports = BrowseNotice;
