import React, { Component } from 'react';

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

  render() {
    const mobileNavClasses = this.state.mobileNavOpen
      ? 'mobile-nav mobile-nav-open'
      : 'mobile-nav mobile-nav-close';
    return (
      <div className='header'>
        <div className='header-bottom'>
          <div className='header-bottom-wrapper'>
            <div className='header-bottom-brand'>
              <a href='/'>
                <span className='regular'>LEVON</span>
                <span className='highlighted'>photo</span>
              </a>
            </div>
            <button className='toggle-button' onClick={this.handleMobileNav}>
              <span className='toggle-button__bar' />
              <span className='toggle-button__bar' />
              <span className='toggle-button__bar' />
            </button>
            <nav className='header-bottom-nav'>
              <ul className='header-bottom-nav__items'>
                <li className='header-bottom-nav__item '>
                  <a className='active' href='/'>
                    PAGRINDINIS
                  </a>
                </li>
                <li className='header-bottom-nav__item'>
                  <a href='/paslaugos'>PASLAUGOS</a>
                </li>

                <li className='header-bottom-nav__item'>
                  <a href='##G'>GALERIJA</a>
                </li>
                <li className='header-bottom-nav__item'>
                  <a href='##K'>KONTAKTAI</a>
                </li>
              </ul>
            </nav>
          </div>
          <nav className={mobileNavClasses}>
            <ul className='mobile-nav__items'>
              <li className='mobile-nav__item'>
                <a href='/'>PAGRINDINIS</a>
              </li>
              <li className='mobile-nav__item'>
                <a href='/paslaugos'>PASLAUGOS</a>
              </li>
              <li className='mobile-nav__item'>
                <a href='##'>GALERIJA</a>
              </li>
              <li className='mobile-nav__item'>
                <a href='##'>KONTAKTAI</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
