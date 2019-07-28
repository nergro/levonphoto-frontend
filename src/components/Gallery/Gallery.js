import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Album from "./Album/Album";
import Spinner from "../UI/Spinner/Spinner";
import TrashIcon from "../../images/svgs/trash-icon";

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

  handleAlbumRemoval = albumId => {
    if (window.confirm("Ar tikrai norite ištrinti?")) {
      axios
        .delete("/album/" + albumId)
        .then(res => {
          window.location.reload();
        })
        .catch(err => {
          alert("Ištrinti nepavyko");
        });
    }
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
              <div className="gallery-album" key={album._id}>
                <a href={"/galerija/" + album._id}>
                  <Album
                    coverUrl={album.albumCover}
                    beforeOneUrl={album.firstHidden}
                    beforeTwoUrl={album.secondHidden}
                    albumTitle={album.title}
                    imagesLoading={this.imagesLoading}
                    imagesLoaded={this.imagesLoaded}
                  />
                </a>
                {this.props.isAuth ? (
                  <TrashIcon
                    clicked={() => this.handleAlbumRemoval(album._id)}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
        {this.state.imagesLoading ? <Spinner style={spinnerStyle} /> : null}
      </div>
    ) : null;

    return <React.Fragment>{content}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth
  };
};

export default connect(mapStateToProps)(gallery);
