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

export const getNotFoundItem = async (id) => {
  let response;

  try {
    response = await API.get("notfound", "/" + id);
  } catch (e) {
    onError("Could not retrieve notfound item. Error: " + e.response.data.error);
    throw e;
  }

  return response;
}

export const updateNotfoundProduct = async (body, id) => {
  let response;

  try {
    response = await API.post("tools", "/products/" + id, {
      body: body
    });
  } catch (e) {
    onError("Could not update notfound item. Error: " + e.response.data.error);
    throw e;
  }

  return response;
}
