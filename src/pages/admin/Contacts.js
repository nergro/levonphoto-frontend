import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Contacts from "../../components/Admin/Contacts/Contacts";

const contacts = props => {
  const userId = localStorage.getItem("userId");

  return (
    <React.Fragment>
      <Header />
      <Contacts />
      <Footer />
      {props.checked && userId !== props.userId ? <Redirect to="/" /> : null}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    checked: state.auth.checked
  };
};
export default connect(mapStateToProps)(contacts);
