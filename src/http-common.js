import axios from "axios";

export default axios.create({
  baseURL: "http://46.101.119.238:4000/",
  headers: {
    "Content-type": "application/json"
  }
});
