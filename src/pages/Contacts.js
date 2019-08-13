import React from "react";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ContactsData from "../components/Contacts/Contacts";

const Contacts = () => {
  return (
    <React.Fragment>
      <Header />
      <ContactsData />
      <Footer />
    </React.Fragment>
  );
};

export default Contacts;
