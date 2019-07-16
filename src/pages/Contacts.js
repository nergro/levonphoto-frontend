import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Contacts from '../components/Contacts/Contacts';

const contacts = () => {
  return (
    <React.Fragment>
      <Header />
      <Contacts />
      <Footer />
    </React.Fragment>
  );
};

export default contacts;
