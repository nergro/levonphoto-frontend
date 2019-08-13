import React, { Component } from "react";
import axios from "axios";

import Header from "../components/Header/Header";
import ServicesComponent from "../components/Services/Services";
import Footer from "../components/Footer/Footer";

class Services extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <ServicesComponent />
        <Footer />
      </React.Fragment>
    );
  }
}

export default Services;
