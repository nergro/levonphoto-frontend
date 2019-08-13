import {
  getMain,
  getAlbum,
  getGallery,
  getServices,
  getContacts,
  updateContacts,
  deleteHomeImages,
  postImages,
  updateServices as updServices,
  removeImage,
  updateAlbum as updtAlbum,
  createAlbum as postAlbum,
  removeAlbum
} from "../../services/levonDB";

export const LOADING = "LOADING";
export const FAILED = "FAILED";
export const GET_MAIN = "GET_MAIN";
export const GET_GALLERY = "GET_GALLERY";
export const GET_SERVICES = "GET_SERVICES";
export const GET_CONTACTS = "GET_CONTACTS";
export const ALL_FETCHED = "ALL_FETCHED";

const loading = () => {
  return { type: LOADING };
};
const failed = () => ({
  type: FAILED
});
const gotMain = mainImages => ({ type: GET_MAIN, mainImages });

const gotGallery = (albums, fetchedAlbums) => ({
  type: GET_GALLERY,
  albums,
  fetchedAlbums
});
const gotServices = services => ({
  type: GET_SERVICES,
  services
});
const gotContacts = contacts => ({
  type: GET_CONTACTS,
  contacts
});
const allFetched = () => ({
  type: ALL_FETCHED
});

export const fetchAll = () => async (dispatch, getState) => {
  dispatch(loading());
  try {
    const mainImages = await getMain();
    dispatch(gotMain(mainImages));
    const contacts = await getContacts();
    dispatch(gotContacts(contacts));
    const galleryData = await getGallery();
    dispatch(gotGallery(galleryData.albums, galleryData.fetchedAlbums));
    const services = await getServices();
    dispatch(gotServices(services));
    dispatch(allFetched());
  } catch (err) {
    dispatch(failed());
  }
};

export const updContacts = data => async dispatch => {
  await updateContacts(data);
  await dispatch(fetchAll());
};

export const removeHomeImages = () => async dispatch => {
  await deleteHomeImages();
  await dispatch(fetchAll());
};

export const uploadImages = (images, location) => async dispatch => {
  await postImages(images, location);
  await dispatch(fetchAll());
};

export const updateServices = (data, image) => async dispatch => {
  await updServices(data, image);
  await dispatch(fetchAll());
};

export const removeImg = imageId => async dispatch => {
  await removeImage(imageId);
  await dispatch(fetchAll());
};

export const updateAlbum = (albumId, images, title) => async dispatch => {
  await updtAlbum(albumId, images, title);
  await dispatch(fetchAll());
};

export const createAlbum = (images, title) => async dispatch => {
  await postAlbum(images, title);
  await dispatch(fetchAll());
};

export const deleteAlbum = albumId => async dispatch => {
  await removeAlbum(albumId);
  await dispatch(fetchAll());
};
