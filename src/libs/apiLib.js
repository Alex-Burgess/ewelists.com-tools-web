import { API } from "aws-amplify";
import { onError } from "libs/errorLib";

export const getNotFoundCount = async () => {
  let response;

  try {
    response = await API.get("tools", "/notfound/count");
  } catch (e) {
    onError("Could not retrieve count. Error: " + e.response.data.error);
    throw e;
  }

  return response;
}

export const getNotFoundItems = async () => {
  let response;

  try {
    response = await API.get("tools", "/notfound");
  } catch (e) {
    onError("Could not retrieve count. Error: " + e.response.data.error);
    throw e;
  }

  return response;
}

export const getNotFoundItem = async (id) => {
  let response;

  try {
    response = await API.get("tools", "/notfound/" + id);
  } catch (e) {
    onError("Could not retrieve notfound item. Error: " + e.response.data.error);
    throw e;
  }

  return response;
}

export const updateNotfoundProduct = async (body, id) => {
  let response;

  try {
    response = await API.post("tools", "/notfound/" + id, {
      body: body
    });
  } catch (e) {
    onError("Could not update notfound item. Error: " + e.response.data.error);
    throw e;
  }

  return response;
}

export const createProduct = async (body) => {
  let response;

  try {
    response = await API.post("tools", "/products", {
      body: body
    });
  } catch (e) {
    onError("Could not create product item. Error: " + e.response.data.error);
    throw e;
  }

  return response;
}

export const getProductItem = async (id) => {
  let response;

  try {
    response = await API.get("tools", "/products/" + id);
  } catch (e) {
    onError("Could not retrieve products item. Error: " + e.response.data.error);
    throw e;
  }

  return response;
}

export const checkProductAcrossEnvironments = async (id) => {
  let response;

  try {
    response = await API.get("tools", "/products/check/" + id);
  } catch (e) {
    onError("There was an unexpected error checking product across environments. Error: " + e.response.data.error);
    throw e;
  }

  return response;
}

export const updateProductItem = async (body, id) => {
  let response;

  try {
    response = await API.put("tools", "/products/" + id, {
      body: body
    });
  } catch (e) {
    onError("Could not update products item. Error: " + e.response.data.error);
    throw e;
  }

  return response;
}

export const querySiteDetails = async (url) => {
  let response;

  try {
    response = await API.get("tools", "/check/details/" + url);
  } catch (e) {
    onError("Could not retrieve details about product. Error: " + e.response.data.error);
    throw e;
  }

  return response;
}
