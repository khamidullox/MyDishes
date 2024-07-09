import axios from "axios";
let api = "";
export let customFetch = () => {
  let req = axios.create({
    baseURL: api,
  });
};

export let fromatPrice = (price) => {
  let newFormat = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(price);
  return newFormat;
};
