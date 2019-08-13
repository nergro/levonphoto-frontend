import {
  LOADING,
  FAILED,
  GET_MAIN,
  GET_CONTACTS,
  GET_SERVICES,
  GET_GALLERY,
  ALL_FETCHED
} from "../actions/main";

const initialState = {
  loading: false,
  mainImages: [],
  albums: null,
  fetchedAlbums: [],
  contacts: null,
  services: null,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case FAILED:
      return { ...state, loading: false, error: true };
    case GET_MAIN:
      return { ...state, mainImages: action.mainImages };
    case GET_CONTACTS:
      return { ...state, contacts: action.contacts };
    case GET_SERVICES:
      return { ...state, services: action.services };
    case GET_GALLERY:
      return {
        ...state,
        albums: action.albums,
        fetchedAlbums: action.fetchedAlbums
      };
    case ALL_FETCHED:
      return { ...state, loading: false };
    default:
      return state;
  }
};
