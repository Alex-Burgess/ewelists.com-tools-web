import React from 'react';
import PropTypes from "prop-types";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
// libs
import * as forms from "libs/formsLib";

export default function ProductForm(props) {
  const {
    isUpdating,
    updated,
    brand,
    setBrand,
    retailer,
    setRetailer,
    price,
    setPrice,
    priceError,
    setPriceError,
    details,
    setDetails,
    productUrl,
    setProductUrl,
    productUrlError,
    setProductUrlError,
    imageUrl,
    setImageUrl,
    imageUrlError,
    setImageUrlError
  } = props;

  const updatePrice = (p) => {
    setPrice(p);

    if (p.length > 0 && (! forms.validatePrice(p))) {
      setPriceError(true);
    } else {
      setPriceError(false);
    }
  }

  const updateProductUrl = (url) => {
    setProductUrl(url);

    if (url.length > 0 && (! forms.validateUrl(url))) {
      setProductUrlError(true);
    } else {
      setProductUrlError(false);

      const retailer = forms.getRetailerFromUrl(url);
      setRetailer(retailer);
    }
  }

  const updateImageUrl = (url) => {
    url = forms.verifyAmazonImage(url);
    setImageUrl(url)

    if (url.length > 0 && (! forms.validateImageUrl(url))) {
      setImageUrlError(true)
    } else {
      setImageUrlError(false)
    }
  }

  return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <CustomInput
            labelText="Brand"
            id="brand"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              disabled: isUpdating || updated,
              value: brand,
              onChange: event => setBrand(event.target.value)
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <CustomInput
            labelText="Retailer"
            id="retailer"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              disabled: isUpdating || updated,
              value: retailer,
              onChange: event => setRetailer(event.target.value)
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <CustomInput
            labelText="Price"
            id="price"
            error={priceError ? true : false}
            helperText="Use 2 decimal places"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              disabled: isUpdating || updated,
              value: price,
              onChange: event => updatePrice(event.target.value)
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <CustomInput
            labelText="Details"
            id="details"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              disabled: isUpdating || updated,
              value: details,
              onChange: event => setDetails(event.target.value)
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <CustomInput
            labelText="Product Link"
            id="product-link"
            error={productUrlError ? true : false}
            helperText="Url is not valid"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              disabled: isUpdating || updated,
              multiline: true,
              rows: 2,
              value: productUrl,
              onChange: event => updateProductUrl(event.target.value)
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <CustomInput
            labelText="Image Link"
            id="image-link"
            error={imageUrlError ? true : false}
            helperText="Url is not valid"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              disabled: isUpdating || updated,
              multiline: true,
              rows: 2,
              value: imageUrl,
              onChange: event => updateImageUrl(event.target.value)
            }}
          />
        </GridItem>
      </GridContainer>
  );
}

ProductForm.propTypes = {
  isUpdating: PropTypes.bool,
  updated: PropTypes.bool,
  brand: PropTypes.string,
  setBrand: PropTypes.func,
  retailer: PropTypes.string,
  setRetailer: PropTypes.func,
  price: PropTypes.string,
  setPrice: PropTypes.func,
  priceError: PropTypes.bool,
  setPriceError: PropTypes.func,
  details: PropTypes.string,
  setDetails: PropTypes.func,
  productUrl: PropTypes.string,
  setProductUrl: PropTypes.func,
  productUrlError: PropTypes.bool,
  setProductUrlError: PropTypes.func,
  imageUrl: PropTypes.string,
  setImageUrl: PropTypes.func,
  imageUrlError: PropTypes.bool,
  setImageUrlError: PropTypes.bool
};
