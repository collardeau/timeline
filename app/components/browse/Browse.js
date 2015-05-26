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
          <h1 className="title">
            Browse
          </h1>
        </header>
      </div>
    );
  }
}

module.exports = Browse;
