import React from 'react';
import PropTypes from "prop-types";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";

export default function ProductForm(props) {
  const {
    isUpdating,
    updated,
    brand,
    updateBrand,
    retailer,
    updateRetailer,
    price,
    updatePrice,
    priceError,
    details,
    updateDetails,
    productUrl,
    updateProductUrl,
    productUrlError,
    imageUrl,
    updateImageUrl,
    imageUrlError
  } = props;

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
              onChange: event => updateBrand(event.target.value)
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
              onChange: event => updateRetailer(event.target.value)
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
              onChange: event => updateDetails(event.target.value)
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <CustomInput
            labelText="Product Link"
            id="product-link"
            error={productUrlError ? true : false}
            helperText="Url must start with http or //"
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
            helperText="Url must start with http or //"
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
  updateBrand: PropTypes.func,
  retailer: PropTypes.string,
  updateRetailer: PropTypes.func,
  price: PropTypes.string,
  updatePrice: PropTypes.func,
  priceError: PropTypes.bool,
  details: PropTypes.string,
  updateDetails: PropTypes.func,
  productUrl: PropTypes.string,
  updateProductUrl: PropTypes.func,
  productUrlError: PropTypes.bool,
  imageUrl: PropTypes.string,
  updateImageUrl: PropTypes.func,
  imageUrlError: PropTypes.bool
};
