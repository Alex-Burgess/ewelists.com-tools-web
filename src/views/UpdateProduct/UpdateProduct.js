import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ProductForm from "components/Product/Form.js"
import FormButtons from "components/Product/FormButtons.js"
// import Environments from "components/Product/EnvironmentSelector.js"
import Result from "components/Product/Result.js"
import ProductSidebar from "components/Product/Sidebar.js";
// libs
import { updateProductItem } from "libs/apiLib.js";
import { onError } from "libs/errorLib";
import { validateUrl, validatePrice, verifyAmazonImage } from "libs/validateLib";

import styles from "assets/jss/material-dashboard-react/views/updateProductStyle.js";

const useStyles = makeStyles(styles);

export default function UpdateProduct(props) {
  const classes = useStyles();

  const { item } = props;
  const productId = item.productId;

  const [brand, setBrand] = useState('');
  const [details, setDetails] = useState('');
  const [price, setPrice] = useState('');
  const [retailer, setRetailer] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [updated, setUpdated] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [productUrlError, setProductUrlError] = useState(false);
  const [imageUrlError, setImageUrlError] = useState(false);

  useEffect( () => {
    setBrand(item.brand);
    setDetails(item.details);
    setPrice(item.price);
    setRetailer(item.retailer);
    setProductUrl(item.productUrl);
    setImageUrl(item.imageUrl);
  }, [item]);


  const validateForm = () => {
    return (
      brand.length > 0 &&
      details.length > 0 &&
      price.length > 0 &&
      retailer.length > 0 &&
      productUrl.length > 0 &&
      imageUrl.length > 0 &&
      !(priceError) &&
      !(productUrlError) &&
      !(imageUrlError)
    );
  }

  const updatePrice = (p) => {
    setPrice(p);

    if (p.length > 0 && (! validatePrice(p))) {
      setPriceError(true);
    } else {
      setPriceError(false);
    }
  }

  const updateProductUrl = (url) => {
    setProductUrl(url);

    if (url.length > 0 && (! validateUrl(url))) {
      setProductUrlError(true);
    } else {
      setProductUrlError(false);
    }
  }

  const updateImageUrl = (url) => {
    url = verifyAmazonImage(url);
    setImageUrl(url)

    if (url.length > 0 && (! validateUrl(url))) {
      setImageUrlError(true)
    } else {
      setImageUrlError(false)
    }
  }

  const updateProduct = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    var body = {
      "brand": brand,
      "details": details,
      "price": price,
      "retailer": retailer,
      "productUrl": productUrl,
      "imageUrl": imageUrl
    }

    try {
      await updateProductItem(body, productId);
      setIsUpdating(false);
      setUpdated(true);
    } catch (e) {
      onError(e);
      setIsUpdating(false);
      setUpdateError(e.response.data.error);
    }
  }

  return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Search Result: {productId} </h4>
              <p className={classes.cardCategoryWhite}>Check the following details and update the price and image.  Update link with any affiliate required configuration.</p>
            </CardHeader>
            <CardBody>
              <form onSubmit={updateProduct}>
                <ProductForm
                  isUpdating={isUpdating}
                  updated={updated}
                  brand={brand}
                  updateBrand={setBrand}
                  retailer={retailer}
                  updateRetailer={setRetailer}
                  price={price}
                  updatePrice={updatePrice}
                  priceError={priceError}
                  details={details}
                  updateDetails={setDetails}
                  productUrl={productUrl}
                  updateProductUrl={updateProductUrl}
                  productUrlError={productUrlError}
                  imageUrl={imageUrl}
                  updateImageUrl={updateImageUrl}
                  imageUrlError={imageUrlError}
                />
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormButtons
                      updated={updated}
                      validate={validateForm}
                      alternateAction={props.clearSearch}
                      submitLabel="Update"
                      successLabel="Update Next"
                    />
                  </GridItem>
                </GridContainer>
              </form>
            </CardBody>
            <Result
              errorMessage={updateError}
            />
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <ProductSidebar
            brand={brand}
            details={details}
            productUrl={productUrl}
            imageUrl={imageUrl}
          />
        </GridItem>
      </GridContainer>
  );
}

UpdateProduct.propTypes = {
  item: PropTypes.object
};
