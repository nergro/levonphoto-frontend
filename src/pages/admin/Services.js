import React from "react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Services from "../../components/Admin/Services/Services";

const services = () => {
  return (
    <React.Fragment>
      <Header />
      <Services />
      <Footer />
    </React.Fragment>
  );
};

export default services;
