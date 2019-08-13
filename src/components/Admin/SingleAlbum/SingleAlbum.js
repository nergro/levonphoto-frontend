import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../UI/Spinner/Spinner";
import { updateAlbum } from "../../../store/actions/main";

class Gallery extends Component {
  state = {
    title: "",
    images: [],
    loading: false,
    error: false,
    albumId: "",
    errorMessage: ""
  };

  componentDidMount() {
    const { match, fetchedAlbums } = this.props;
    const { albumId } = match.params;

    const album = this.findAlbum(fetchedAlbums, albumId);
    this.setState({
      title: album.title,
      albumId: albumId
    });
  }

  findAlbum = (albums, albumId) => {
    const album = albums
      ? albums.find(al => al.album.toString() === albumId)
      : null;
    return album;
  };

  onMultiFilePickChange = (value, files) => {
    if (files) {
      this.setState({
        [value]: files
      });
    }
  };

  onTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };

  handleSubmit = async e => {
    const { updateAlbum, match, history } = this.props;
    const { images, title } = this.state;
    this.setState({
      loading: true
    });
    e.preventDefault();

    const albumId = match.params.albumId;
    const imgArr = [...images];
    try {
      await updateAlbum(albumId, imgArr, title);
      this.setState({
        loading: false
      });
      history.push("/galerija/" + albumId);
    } catch (err) {
      this.setState({
        loading: false,
        error: true,
        errorMessage: "Atnaujinti albumo nepavyko"
      });
    }
  };

  render() {
    const content = this.state.loading ? (
      <Spinner />
    ) : this.props.error ? (
      <h1 style={{ textAlign: "center" }}>Serverio klaida.</h1>
    ) : (
      <div className="admin-login">
        <h1>Albumo redagavimas</h1>
        {this.state.error ? (
          <div className="validate">
            <p>{this.state.errorMessage}</p>
          </div>
        ) : null}
        <div className="contacts-form login-form">
          <form className="message-form" onSubmit={this.handleSubmit}>
            <div className="form-control">
              <label htmlFor="title">Albumo pavadinimas</label>
              <input
                type="text"
                name="title"
                autoComplete="off"
                placeholder="Albumo pavadinimas"
                onChange={this.onTitleChange}
                spellCheck="false"
                value={this.state.title}
                style={{ marginTop: "0.5rem" }}
              />
            </div>
            <hr />
            <div className="form-control">
              <label htmlFor="image">Pridėti nuotraukų į albumą</label>
              <input
                type="file"
                multiple
                name="image"
                onChange={e =>
                  this.onMultiFilePickChange("images", e.target.files)
                }
              />
            </div>

            <button type="submit" className="form-button">
              PUBLIKUOTI
            </button>
          </form>
        </div>
      </div>
    );
    return <React.Fragment>{content}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    fetchedAlbums: state.main.fetchedAlbums
  };
};
const mapDispatchToProps = {
  updateAlbum
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Gallery));
