import axios from "axios";

const url = process.env.REACT_APP_BASEURL;
const key = process.env.REACT_APP_APIKEY;
const session = localStorage.getItem("sessionId")

export const getData = async () => {
  const movie = await axios.get(`${url}movie/popular?api_key=${key}`);
  return movie.data.results;
};

export const logout = () => {
  axios
    .delete(`${url}authentication/session?api_key=${key}`, {
      data: {
        session_id: session,
      }
    })
    .then((rest) => {
      console.log(rest);
    });
  localStorage.removeItem("sessionId");
  localStorage.removeItem("name");
  window.location.assign('/')
};