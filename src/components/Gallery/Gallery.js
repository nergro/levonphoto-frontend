import React, { Component } from "react";
import axios from "axios";
import Album from "./Album/Album";
import Spinner from "../UI/Spinner/Spinner";

class gallery extends Component {
  state = {
    albums: null,
    loading: false,
    error: false,
    imagesLoading: false
  };
  componentDidMount() {
    this.setState({
      loading: true
    });
    axios
      .get("/albums")
      .then(res => {
        this.setState({
          albums: res.data.albums,
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: true
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
    const albumStyle = {
      opacity: this.state.imagesLoading ? "0" : "1"
    };
    const spinnerStyle = {
      position: "absolute",
      top: "30%"
    };
    const content = this.state.loading ? (
      <Spinner />
    ) : this.state.error ? (
      <h1 style={{ textAlign: "center" }}>
        Serverio klaida. Atsiprašome už nepatogumus.
      </h1>
    ) : this.state.albums ? (
      <div className="gallery">
        <h1 className="gallery-title">Galerija</h1>
        <div className="gallery-albums" style={albumStyle}>
          {this.state.albums.map(album => {
            return (
              <a href={"/galerija/" + album._id} key={album._id}>
                <Album
                  coverUrl={"http://localhost:8080/" + album.albumCover}
                  beforeOneUrl={"http://localhost:8080/" + album.firstHidden}
                  beforeTwoUrl={"http://localhost:8080/" + album.secondHidden}
                  albumTitle={album.title}
                  imagesLoading={this.imagesLoading}
                  imagesLoaded={this.imagesLoaded}
                />
              </a>
            );
          })}
        </div>
        {this.state.imagesLoading ? <Spinner style={spinnerStyle} /> : null}
      </div>
    ) : null;

    return <React.Fragment>{content}</React.Fragment>;
  }
}

export default gallery;
