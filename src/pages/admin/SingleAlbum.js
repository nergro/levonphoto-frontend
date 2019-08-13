import React from "react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SingleAlbum from "../../components/Admin/SingleAlbum/SingleAlbum";

const singleAlbum = () => {
  return (
    <React.Fragment>
      <Header />
      <SingleAlbum />
      <Footer />
    </React.Fragment>
  );
};

export default singleAlbum;
