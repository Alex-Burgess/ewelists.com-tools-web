export function validateUrl(url) {
  return (
    url.length > 0 &&
    (url.substring(0, 2) === "//" ||
    url.substring(0, 7) === "http://" ||
    url.substring(0, 8) === "https://")
  );
}

export function validatePrice(price) {
  var regexp = /^\d+\.\d{2}$/;

  return (
    price.length > 0 && regexp.test(price)
  );
}


export function verifyAmazonImage(url) {
  if (url.includes('amazon.co.uk')) {
    var image = url.match(/src="(.*)" ></);
    return image[1];
  }

  return url
}
