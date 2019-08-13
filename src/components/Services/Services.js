import React from "react";
import { connect } from "react-redux";
import Spinner from "../UI/Spinner/Spinner";

const services = ({ services, error }) => {
  return (
    <React.Fragment>
      {services ? (
        <div className="services">
          <div className="services-left">
            <img src={services.imageUrl} alt="Cover" />
          </div>
          <div className="services-right">
            <h1 className="services-right__title">PASLAUGOS</h1>
            <div className="services-right__services">
              <div className="services-right__service">
                <h4>{services.firstTitle}</h4>
                <p>{services.firstDescription}</p>
              </div>
              <div className="services-right__service">
                <h4>{services.secondTitle}</h4>
                <p>{services.secondDescription}</p>
              </div>
              <div className="services-right__service">
                <h4>{services.thirdTitle}</h4>
                <p>{services.thirdDescription}</p>
              </div>
            </div>
          </div>
        </div>
      ) : error ? (
        <h1 style={{ textAlign: "center" }}>
          Serverio klaida. Atsiprašome už nepatogumus.
        </h1>
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    services: state.main.services,
    error: state.main.error
  };
};

export default connect(mapStateToProps)(services);
