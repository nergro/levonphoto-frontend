import axios from "axios";

export const URL = "https://levon.herokuapp.com";

/* AUTH */

export const loginUser = async formData => {
  const {
    data: { userId }
  } = await axios.post(`${URL}/login`, formData);
  return userId;
};

/* MAIN NON AUTH DATA */

export const getMain = async () => {
  const {
    data: { images }
  } = await axios.get(`${URL}/home`);
  return images;
};

export const getContacts = async () => {
  const {
    data: { contacts }
  } = await axios.get(`${URL}/contacts`);
  return contacts[0];
};

export const getGallery = async () => {
  const {
    data: { albums }
  } = await axios.get(`${URL}/albums`);
  const fetchedAlbums = await getAlbums(albums);
  return { albums, fetchedAlbums };
};

export const getServices = async () => {
  const {
    data: { services }
  } = await axios.get(`${URL}/services`);
  return services[0];
};

const getAlbum = async albumId => {
  const { data } = await axios.get(`${URL}/album/` + albumId);
  return {
    album: data.images[0].album,
    images: data.images,
    title: data.title
  };
};

const getAlbums = async albums => {
  const promises = albums.map(async album => {
    const albumData = await getAlbum(album._id);
    return albumData;
  });
  return Promise.all(promises);
};

/* AUTH ACTIONS */
export const updateContacts = contactsData => {
  const { data } = axios.post(`${URL}/contacts`, contactsData);
  return data;
};

export const deleteHomeImages = () => axios.delete(`${URL}/home/images`);

const uploadImage = formData =>
  axios.post(
    "https://api.cloudinary.com/v1_1/dvrfxqcuv/image/upload",
    formData,
    {
      headers: { "X-Requested-With": "XMLHttpRequest" }
    }
  );

const uploadImages = (images, location) => {
  const promises = images.map(async image => {
    const formData = getFormData(image, location);
    const {
      data: { secure_url },
      data: { public_id }
    } = await uploadImage(formData);
    return {
      imageUrl: secure_url,
      publicId: public_id
    };
  });
  return Promise.all(promises);
};

export const postImages = async (images, location) => {
  const res = await uploadImages(images, location);
  const imgs = { images: res };
  const postRes = await axios.post(`${URL}/home`, imgs);
  return postRes;
};

export const updateServices = async (data, image) => {
  const upData = { ...data };
  if (image) {
    const formData = getFormData(image, "services");
    const {
      data: { secure_url },
      data: { public_id }
    } = await uploadImage(formData);
    upData.imageUrl = secure_url;
    upData.publicId = public_id;
  }
  const res = await axios.post(`${URL}/services`, upData);
  return res;
};

const getFormData = (image, location) => {
  const formData = new FormData();
  const uniqueFileName = image.name + "-" + new Date().toISOString();

  formData.append("file", image);
  formData.append("tags", "home");
  formData.append("upload_preset", "pqfkiqsm");
  formData.append("api_key", "315826331834584");
  formData.append("timestamp", (Date.now() / 1000) | 0);
  formData.append("public_id", `${location}/${uniqueFileName}`);
  return formData;
};

export const removeImage = async imageId => {
  const { data } = await axios.delete(`${URL}/image/` + imageId);
  return data;
};

export const createAlbum = async (images, title) => {
  const data = { title };
  const res = await uploadImages(images, "albums");
  data.images = res;
  const postRes = await axios.post(`${URL}/album`, data);
  return postRes;
};

export const updateAlbum = async (albumId, images, title) => {
  const data = {
    albumId,
    title
  };
  if (images) {
    const res = await uploadImages(images, "albums");
    data.images = res;
  }
  const postRes = await axios.post(`${URL}/album/${albumId}/edit`, data);
  return postRes;
};

export const removeAlbum = async albumId => {
  const { data } = await axios.delete(`${URL}/album/${albumId}`);
  return data;
};
