import { API } from "aws-amplify";
import { onError } from "libs/errorLib";
// import config from 'config.js';

export const getNotFoundCount = async () => {
  let response;

  try {
    response = await API.get("tools", "/products/count");
  } catch (e) {
    onError("Could not retrieve count. Error: " + e.response.data.error);
    throw e;
  }

  return response;
}

export const getNotFoundItems = async () => {
  let response;

  try {
    response = await API.get("tools", "/products");
  } catch (e) {
    onError("Could not retrieve count. Error: " + e.response.data.error);
    throw e;
  }

  return response;
}
