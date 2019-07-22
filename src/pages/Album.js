import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AlbumImages from "../components/Gallery/Album/AlbumImages/AlbumImages";

const album = () => {
  return (
    <React.Fragment>
      <Header />
      <AlbumImages />
      <Footer />
    </React.Fragment>
  );
};

export default album;
