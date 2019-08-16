import React from "react";
import "./main-spinner.scss";

const Spinner = () => (
  // <div className="main-spinner">
  //   <div className="cube1" />
  //   <div className="cube2" />
  // </div>
  <div class="sk-folding-cube">
    <div class="sk-cube1 sk-cube" />
    <div class="sk-cube2 sk-cube" />
    <div class="sk-cube4 sk-cube" />
    <div class="sk-cube3 sk-cube" />
  </div>
);

export default Spinner;
