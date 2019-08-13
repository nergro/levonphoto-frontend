import React, { Component } from "react";
import { connect } from "react-redux";
import { SRLWrapper } from "simple-react-lightbox";
import { withRouter } from "react-router-dom";

import Spinner from "../../../UI/Spinner/Spinner";
import Image from "../../../Image/Image";
import TrashIcon from "../../../../images/svgs/trash-icon";
import { removeImg } from "../../../../store/actions/main";

class Featured extends Component {
  state = {
    loading: false,
    album: null
  };

  componentDidMount() {
    const { match, fetchedAlbums } = this.props;
    const { albumId } = match.params;
    const album = this.findAlbum(fetchedAlbums, albumId);
    this.setState({
      album
    });
  }

  findAlbum = (albums, albumId) => {
    const album = albums
      ? albums.find(al => al.album.toString() === albumId)
      : null;
    return album;
  };

  albumEdit = () => {
    const { match, history } = this.props;
    const albumId = match.params.albumId;
    history.push("/galerija/" + albumId + "/edit");
  };

  handleImageRemoval = async imageId => {
    const { removeImg } = this.props;
    if (window.confirm("Ar tikrai norite ištrinti?")) {
      try {
        await removeImg(imageId);
      } catch (err) {
        alert("Ištrinti nepavyko");
      }
    }
  };

  render() {
    const { isAuth } = this.props;
    const { album, loading } = this.state;
    const albumHeadStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    };
    return (
      <SRLWrapper>
        {loading ? (
          <Spinner />
        ) : album ? (
          <div className="featured">
            <div
              className="featured-head"
              style={isAuth ? albumHeadStyle : null}
            >
              <h1>{album.title}</h1>
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
              {isAuth ? (
                <button
                  className="form-button add-button"
                  onClick={this.albumEdit}
                >
                  ALBUMO REDAGAVIMAS
                </button>
              ) : null}
            </div>
            <div className="featured-gallery">
              {album.images.map(image => {
                return (
                  <div
                    className="featured-gallery__image-wrapper"
                    key={image._id}
                  >
                    <div className="featured-gallery__image">
                      <Image imageUrl={image.imageUrl} />
                    </div>
                    {isAuth ? (
                      <TrashIcon
                        clicked={() => this.handleImageRemoval(image._id)}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <h1 style={{ textAlign: "center" }}>
            Serverio klaida. Atsiprašome už nepatogumus.
          </h1>
        )}
      </SRLWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetchedAlbums: state.main.fetchedAlbums,
    isAuth: state.auth.isAuth
  };
};

const mapDispatchToProps = {
  removeImg
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Featured));
