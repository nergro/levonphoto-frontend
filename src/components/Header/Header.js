import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import * as actions from "../../store/actions";
// import logout from '../../store/actions/main';
import { handleLogout } from "../../store/actions/auth";

class Header extends Component {
  state = {
    mobileNavOpen: false
  };

  handleMobileNav = () => {
    this.setState(prevState => {
      return {
        mobileNavOpen: !this.state.mobileNavOpen
      };
    });
  };

  logout = () => {
    this.props.handleLogout();
  };

  render() {
    const mobileNavClasses = this.state.mobileNavOpen
      ? "mobile-nav mobile-nav-open"
      : "mobile-nav mobile-nav-close";
    return (
      <div className="header">
        <div className="header-bottom">
          <div className="header-bottom-wrapper">
            <div className="header-bottom-brand">
              <Link to="/">
                <span className="regular">LEVON</span>
                <span className="highlighted">photo</span>
              </Link>
            </div>
            <button className="toggle-button" onClick={this.handleMobileNav}>
              <span className="toggle-button__bar" />
              <span className="toggle-button__bar" />
              <span className="toggle-button__bar" />
            </button>
            <nav className="header-bottom-nav">
              <ul className="header-bottom-nav__items">
                <li className="header-bottom-nav__item ">
                  <Link className="active" to="/">
                    PAGRINDINIS
                  </Link>
                </li>
                <li className="header-bottom-nav__item">
                  <Link to="/paslaugos">PASLAUGOS</Link>
                </li>

                <li className="header-bottom-nav__item">
                  <Link to="/galerija">GALERIJA</Link>
                </li>
                <li className="header-bottom-nav__item">
                  <Link to="/kontaktai">KONTAKTAI</Link>
                </li>
                {this.props.isAuth ? (
                  <li className="header-bottom-nav__item">
                    <Link to="/admin">VALDYMAS</Link>
                  </li>
                ) : null}

                {this.props.isAuth ? (
                  <li className="header-bottom-nav__item">
                    <Link to="/" style={{ color: "red" }} onClick={this.logout}>
                      ATSIJUNGTI
                    </Link>
                  </li>
                ) : null}
              </ul>
            </nav>
          </div>
          <nav className={mobileNavClasses}>
            <ul className="mobile-nav__items">
              <li className="mobile-nav__item">
                <Link to="/">PAGRINDINIS</Link>
              </li>
              <li className="mobile-nav__item">
                <Link to="/paslaugos">PASLAUGOS</Link>
              </li>
              <li className="mobile-nav__item">
                <Link to="/galerija">GALERIJA</Link>
              </li>
              <li className="mobile-nav__item">
                <Link to="/kontaktai">KONTAKTAI</Link>
              </li>
              {this.props.isAuth ? (
                <li className="mobile-nav__item">
                  <Link to="/admin">VALDYMAS</Link>
                </li>
              ) : null}

              {this.props.isAuth ? (
                <li className="mobile-nav__item">
                  <Link to="/" style={{ color: "red" }} onClick={this.logout}>
                    ATSIJUNGTI
                  </Link>
                </li>
              ) : null}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth
  };
};
const mapDispatchToProps = {
  handleLogout
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
