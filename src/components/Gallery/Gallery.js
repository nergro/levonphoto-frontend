import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Album from "./Album/Album";
import Spinner from "../UI/Spinner/Spinner";
import TrashIcon from "../../images/svgs/trash-icon";
import { deleteAlbum } from "../../store/actions/main";

const Gallery = ({ isAuth, albums, error, deleteAlbum }) => {
  const handleAlbumRemoval = async albumId => {
    if (window.confirm("Ar tikrai norite ištrinti?")) {
      try {
        await deleteAlbum(albumId);
      } catch (err) {
        alert("Ištrinti nepavyko");
      }
    }
  };

  return (
    <React.Fragment>
      {albums ? (
        <div className="gallery">
          <h1 className="gallery-title">Galerija</h1>
          <div className="gallery-albums">
            {albums.map(album => {
              return (
                <div className="gallery-album" key={album._id}>
                  <Link to={"/galerija/" + album._id}>
                    <Album
                      coverUrl={album.albumCover}
                      beforeOneUrl={album.firstHidden}
                      beforeTwoUrl={album.secondHidden}
                      albumTitle={album.title}
                    />
                  </Link>
                  {isAuth ? (
                    <TrashIcon clicked={() => handleAlbumRemoval(album._id)} />
                  ) : null}
                </div>
              );
            })}
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
    isAuth: state.auth.isAuth,
    albums: state.main.albums,
    error: state.main.error
  };
};

const mapDispatchToProps = {
  deleteAlbum
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery);
