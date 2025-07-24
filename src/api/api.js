import axios from "axios";

const baseURL = "http://localhost:3000";

export const fetchAllPlaces = async () => {
  const res = await axios.get(`${baseURL}/places`);
  return res.data.places;
};

export const addToWishlist = async (place) => {
  const res = await axios.post(`${baseURL}/users/places`, { place });
  return res.data;
};

export const fetchWishlistedPlaces = async () => {
  const res = await axios.get(`${baseURL}/users/places`);
  return res.data.places;
};

export const removeFromWishlist = async (placeId) => {
  const res = await axios.delete(`${baseURL}/users/places/${placeId}`);
  return res;
};

export const IMAGE_BASE_URL = baseURL;
