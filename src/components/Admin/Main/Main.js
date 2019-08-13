import React from "react";
import { Link } from "react-router-dom";

const main = () => {
  return (
    <div className="admin-main">
      <h1>Valdymas</h1>
      <div className="admin-main-nav">
        <ul className="admin-main-nav__items">
          <li className="admin-main-nav__item">
            <Link to="/admin/pagrindinis">PAGRINDINIS PUSLAPIS</Link>
          </li>
          <li className="admin-main-nav__item">
            <Link to="/admin/paslaugos">PASLAUGOS</Link>
          </li>
          <li className="admin-main-nav__item">
            <Link to="/admin/galerija">ALBUMO SUKŪRIMAS</Link>
          </li>
          <li className="admin-main-nav__item">
            <Link to="/admin/kontaktai">KONTAKTAI</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default main;
