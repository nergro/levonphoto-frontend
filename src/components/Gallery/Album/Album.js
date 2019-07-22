import React, { Component } from "react";
import "./Album.scss";

class album extends Component {
  componentDidMount() {
    this.props.imagesLoading();
  }

  render() {
    const beforeOne = {
      backgroundImage: `url(${this.props.beforeOneUrl})`
    };
    const beforeTwo = {
      backgroundImage: `url(${this.props.beforeTwoUrl})`
    };

    return (
      <div className="album">
        <div className="album-behind-one" style={beforeOne} />
        <div className="album-behind-two" style={beforeTwo} />
        <img
          className="album-cover"
          src={this.props.coverUrl}
          alt="album"
          onLoad={this.props.imagesLoaded}
        />

        <h3>{this.props.albumTitle}</h3>
      </div>
    );
  }
}

export default album;
