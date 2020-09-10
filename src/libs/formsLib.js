const retailersMap = {
  'amzn.to': 'amazon.co.uk'
}


export function validateUrl(url) {
    try {
      new URL(url);
    } catch (e) {
      return false;
    }

    return true;
}

export function validateImageUrl(url) {
  return (
    url.length > 0 &&
    (url.substring(0, 2) === "//" || validateUrl(url))
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


export const getRetailerFromUrl = (urlString) => {
  let url;

  try {
    url = new URL(urlString);
  } catch (e) {
    return ''
  }

  let domain = url.hostname;

  if (domain.startsWith('www.')) {
    domain = domain.substring(4);
  } else if (domain.startsWith('www2.')) {
    domain = domain.substring(5);
  }

  if (domain in retailersMap) {
    domain = retailersMap[domain];
  }

  return domain;
}
