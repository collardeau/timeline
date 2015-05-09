const React = require('react');
const $ = require('jquery');
const hasher = require('hasher');

class Navigation extends React.Component {

    handleLink(route) {
        hasher.setHash(route);
    }

    componentDidMount() {

        $(".dropdown-button").click(function() {
            $(".dropdown-menu").toggleClass("show-menu");
            $(".dropdown-menu > li").click(function(){
                $(".dropdown-menu").removeClass("show-menu");
            });
            $(".dropdown-menu.dropdown-select > li").click(function() {
                $(".dropdown-button").html($(this).html());
            });
        });
    }

    render() {

        return (
            <header>
                <div className="dropdown">
                    <div className="dropdown-container">
                        <p className="dropdown-description">Timeline</p>
                        <p className="dropdown-button">Click to Select</p>
                        <ul className="dropdown-menu dropdown-select">
                            <li>Tonton</li>
                            <li>Jackson</li>
                            <li>Visa</li>
                            <li>Pearl Jam</li>
                        </ul>
                    </div>
                </div>

                <div className="buttons">
                    <button className="btn-action"><i className="fa fa-eye"></i></button>
                </div>

            </header>
        )
    }
}

module.exports = Navigation;