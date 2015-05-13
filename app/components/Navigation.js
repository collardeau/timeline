const React = require('react');
const $ = require('jquery');
const hasher = require('hasher');

let timelineActions = require('../actions/timelineActions');

class Navigation extends React.Component {

    handleLink(route) {
        hasher.setHash(route);
    }

    handleClick(tl) {
        console.log("going to change the data here");
        console.log(tl);
        timelineActions.changeTimeline(tl);
    }

    componentDidMount() {
        var menuToggle = $('#js-centered-navigation-mobile-menu').unbind();
        $('#js-centered-navigation-menu').removeClass("show");

        menuToggle.on('click', function(e) {
            e.preventDefault();
            $('#js-centered-navigation-menu').slideToggle(function(){
                if($('#js-centered-navigation-menu').is(':hidden')) {
                    $('#js-centered-navigation-menu').removeAttr('style');
                }
            });
        });
    }

    render() {

        return (
            <header className="centered-navigation" role="banner">

                <div className="centered-navigation-wrapper">

                    <a href="javascript:void(0)" id="js-centered-navigation-mobile-menu" className="centered-navigation-mobile-menu">MENU</a>
                    <nav role="navigation">
                        <ul id="js-centered-navigation-menu" className="centered-navigation-menu show">


                            <li className="nav-link more">
                                <a href="javascript:void(0)">Timelines</a>
                                <ul className="submenu">
                                    <li>
                                        <a onClick={this.handleClick.bind(this,'tonton') }>Tonton</a>
                                    </li>
                                    <li>
                                        <a onClick={this.handleClick.bind(this,'pj') }>Pearl Jam</a>
                                    </li>
                                    <li>
                                        <a onClick={this.handleClick.bind(this,'nina') }>Nina</a>
                                    </li>
                                    <li>
                                        <a onClick={this.handleClick.bind(this,'visa') }>Visa</a>
                                    </li>

                                </ul>
                            </li>
                            <li className="nav-link">
                                <a onClick={this.handleLink.bind(this,'account') }>Account</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }
}

module.exports = Navigation;