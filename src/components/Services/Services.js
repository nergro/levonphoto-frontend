import React from "react";
import Spinner from "../UI/Spinner/Spinner";

const services = props => {
  const content = props.loading ? (
    <Spinner />
  ) : props.services ? (
    <div className="services">
      <div className="services-left">
        <img src={props.services.imageUrl} alt="Cover" />
      </div>
      <div className="services-right">
        <h1 className="services-right__title">PASLAUGOS</h1>
        <div className="services-right__services">
          <div className="services-right__service">
            <h4>{props.services.firstTitle}</h4>
            <p>{props.services.firstDescription}</p>
          </div>
          <div className="services-right__service">
            <h4>{props.services.secondTitle}</h4>
            <p>{props.services.secondDescription}</p>
          </div>
          <div className="services-right__service">
            <h4>{props.services.thirdTitle}</h4>
            <p>{props.services.thirdDescription}</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h1 style={{ textAlign: "center" }}>
      Serverio klaida. Atsiprašome už nepatogumus.
    </h1>
  );
  return <div>{content}</div>;
};

export default services;
