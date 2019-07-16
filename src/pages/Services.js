import React from 'react';
import Header from '../components/Header/Header';
import Services from '../components/Services/Services';
import Footer from '../components/Footer/Footer';

const services = () => {
  return (
    <React.Fragment>
      <Header />
      <Services coverUrl='https://levonphoto.lt/img/portfolio/10.jpg' />
      <Footer forceBottom={true} />
    </React.Fragment>
  );
};

export default services;
