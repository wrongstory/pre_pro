import axios from "axios";

const baseURL = "http://localhost:3000";

export const fetchAllPlaces = async () => {
  const res = await axios.get(`${baseURL}/places`);
  return res.data.places;
};

export const IMAGE_BASE_URL = baseURL;
