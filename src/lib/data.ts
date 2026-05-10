import axios from "axios";

const api = axios.create({
  baseURL: "https://darulislam-server-v2.vercel.app/api",
});

export const getAllCourses = async () => {
  const { data } = await api.get("/courses/education");

  return data;
};
