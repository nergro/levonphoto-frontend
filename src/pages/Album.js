import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Featured from '../components/Featured/Featured';

const album = () => {
  return (
    <React.Fragment>
      <Header />
      <Featured title='Albumo pavadinimas' />
      <Footer />
    </React.Fragment>
  );
};

export default album;
