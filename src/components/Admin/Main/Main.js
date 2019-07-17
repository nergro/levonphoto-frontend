import React from 'react';

const main = () => {
  return (
    <div className='admin-main'>
      <h1>Valdymas</h1>
      <div className='admin-main-nav'>
        <ul className='admin-main-nav__items'>
          <li className='admin-main-nav__item'>
            <a href='/'>PAGRINDINIS PUSLAPIS</a>
          </li>
          <li className='admin-main-nav__item'>
            <a href='/'>PASLAUGOS</a>
          </li>
          <li className='admin-main-nav__item'>
            <a href='/'>GALERIJA</a>
          </li>
          <li className='admin-main-nav__item'>
            <a href='/'>KONTAKTAI</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default main;
