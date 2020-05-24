import axios from "axios";

const instance = axios.create({
  baseURL: "https://jhimbo-29c55.firebaseio.com",
});

export default instance;
