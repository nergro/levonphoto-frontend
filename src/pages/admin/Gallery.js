import React from "react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Gallery from "../../components/Admin/Gallery/Gallery";

const gallery = () => {
  return (
    <React.Fragment>
      <Header />
      <Gallery />
      <Footer />
    </React.Fragment>
  );
};

export default gallery;
