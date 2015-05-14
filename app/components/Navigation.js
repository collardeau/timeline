const React = require('react');
const $ = require('jquery');
const hasher = require('hasher');

let timelineActions = require('../actions/timelineActions');
let authUtils = require('../utils/authUtils');

class Navigation extends React.Component {

    handleLink(route) {
        hasher.setHash(route);
    }

    handleClick(tl) {
        this.toggleMenu();
        timelineActions.changeTimeline(tl);
    }

    handleLogout() {
        authUtils.logout();
    }

    toggleMenu() {
        console.log('togglng menu');
        $('#js-centered-navigation-menu').slideToggle(function(){
            if($('#js-centered-navigation-menu').is(':hidden')) {
                $('#js-centered-navigation-menu').removeAttr('style');
            }
        });
    }

    componentDidMount() {
        var menuToggle = $('#js-centered-navigation-mobile-menu').unbind();
        $('#js-centered-navigation-menu').removeClass("show");

        menuToggle.on('click', function(e) {
            e.preventDefault();
            // can't call this.toggleMenu() ?
            $('#js-centered-navigation-menu').slideToggle(function(){
                if($('#js-centered-navigation-menu').is(':hidden')) {
                    $('#js-centered-navigation-menu').removeAttr('style');
                }
            });
        });
    }

    render() {

        let loggedIn = authUtils.isLoggedIn(),
            navOptions;

        if (loggedIn) {
            navOptions = (
            <ul id="js-centered-navigation-menu" className="centered-navigation-menu show">
                <li className="nav-link more">
                    <a href="javascript:void(0)">Timelines</a>
                    <ul className="submenu">
                        <li>
                            <a onClick={this.handleClick.bind(this,'nina') }>Nina</a>
                        </li>
                        <li>
                            <a onClick={this.handleClick.bind(this,'tonton') }>Tonton</a>
                        </li>
                        <li>
                            <a onClick={this.handleClick.bind(this,'painting') }>Painters</a>
                        </li>
                        <li>
                            <a onClick={this.handleClick.bind(this,'visa') }>Visa</a>
                        </li>
                    </ul>
                </li>
                <li className="nav-link">
                    <a onClick={ this.handleLogout }>Log Out</a>
                </li>

            </ul>

            )
        } else {
            navOptions = (
            <ul id="js-centered-navigation-menu" className="centered-navigation-menu show">
                <li className="nav-link">
                    <a href="javascript:void(0)">Login</a>
                </li>

                <li className="nav-link">
                    <a href="javascript:void(0)">Timelines</a>

                </li>
            </ul>

            )
        }

        return (
            <header className="centered-navigation" role="banner">

                <div className="centered-navigation-wrapper">

                    <a href="javascript:void(0)" id="js-centered-navigation-mobile-menu" className="centered-navigation-mobile-menu">MENU</a>
                    <nav role="navigation">
                        { navOptions }
                    </nav>
                </div>
            </header>
        )
    }
}

module.exports = Navigation;