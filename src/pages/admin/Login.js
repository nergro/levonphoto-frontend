import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Login from '../../components/Admin/Login/Login';

const main = () => {
  return (
    <React.Fragment>
      <Header />
      <Login />
      <Footer />
    </React.Fragment>
  );
};

export default main;
