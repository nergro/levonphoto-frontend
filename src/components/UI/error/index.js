import React from "react";

const error = ({ children }) => (
  <h1
    className="error-message"
    style={{ margin: "3rem auto", textAlign: "center" }}
  >
    {children}
  </h1>
);

export default error;
