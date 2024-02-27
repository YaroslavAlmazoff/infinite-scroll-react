import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:9000" });
const getPosts = async (page) => {
  return await api.get(`/api/posts/${page}`);
};

export { getPosts };
