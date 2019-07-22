import React, { Component } from "react";
import axios from "axios";
import { SRLWrapper } from "simple-react-lightbox";
import { withRouter } from "react-router-dom";

import Image from "../Image/Image";
import Spinner from "../UI/Spinner/Spinner";

class Featured extends Component {
  state = {
    images: [],
    loading: false,
    error: false,
    imagesLoading: false
  };

  componentDidMount() {
    this.setState({
      loading: true
    });
    axios
      .get("/home")
      .then(res => {
        this.setState({
          images: res.data.images,
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          error: true,
          loading: false
        });
      });
  }

  imagesLoading = () => {
    this.setState({
      imagesLoading: true
    });
  };
  imagesLoaded = () => {
    this.setState({
      imagesLoading: false
    });
  };

  render() {
    console.log(this.state.imagesLoading);
    const galleryStyle = {
      opacity: this.state.imagesLoading ? "0" : "1"
    };
    const spinnerStyle = {
      position: "absolute",
      top: "25rem",
      left: "48.5%"
    };
    const content = this.state.loading ? (
      <Spinner />
    ) : this.state.error ? (
      <h1 style={{ textAlign: "center" }}>
        Serverio klaida. Atsiprašome už nepatogumus.
      </h1>
    ) : (
      <div className="featured">
        <div className="featured-head">
          <h1>{this.props.title}</h1>
          <p>{this.props.subtitle}</p>
          <svg
            className="svg-squares"
            x="0px"
            y="0px"
            viewBox="0 0 381.39 381.39"
          >
            <g>
              <g>
                <g>
                  <path
                    d="M127.13,0H31.782C14.239,0,0,14.239,0,31.782v95.347c0,17.544,14.239,31.782,31.782,31.782h95.347
				c17.544,0,31.782-14.239,31.782-31.782V31.782C158.912,14.239,144.674,0,127.13,0z"
                  />
                  <path
                    d="M349.607,0H254.26c-17.544,0-31.782,14.239-31.782,31.782v95.347
				c0,17.544,14.239,31.782,31.782,31.782h95.347c17.544,0,31.782-14.239,31.782-31.782V31.782C381.39,14.239,367.151,0,349.607,0z"
                  />
                  <path
                    d="M127.13,222.477H31.782C14.239,222.477,0,236.716,0,254.26v95.347
				c0,17.544,14.239,31.782,31.782,31.782h95.347c17.544,0,31.782-14.239,31.782-31.782V254.26
				C158.912,236.716,144.674,222.477,127.13,222.477z"
                  />
                  <path
                    d="M349.607,222.477H254.26c-17.544,0-31.782,14.239-31.782,31.782v95.347
				c0,17.544,14.239,31.782,31.782,31.782h95.347c17.544,0,31.782-14.239,31.782-31.782V254.26
				C381.39,236.716,367.151,222.477,349.607,222.477z"
                  />
                </g>
              </g>
            </g>
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
          </svg>
        </div>
        <div className="featured-gallery" style={galleryStyle}>
          {this.state.images.map(image => {
            return (
              <div className="featured-gallery__image" key={image._id}>
                <Image
                  imageUrl={"http://localhost:8080/" + image.imageUrl}
                  imagesLoading={this.imagesLoading}
                  imagesLoaded={this.imagesLoaded}
                />
              </div>
            );
          })}
        </div>
        {this.state.imagesLoading ? <Spinner style={spinnerStyle} /> : null}
      </div>
    );
    return <SRLWrapper>{content}</SRLWrapper>;
  }
}

export default withRouter(Featured);
