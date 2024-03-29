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
import Environments from "components/Product/EnvironmentSelector.js"
import Result from "components/Product/Result.js"
import ProductSidebar from "components/Product/Sidebar.js";
// libs
import { createProduct } from "libs/apiLib.js";
import { onError } from "libs/errorLib";
import * as forms from "libs/formsLib";

import styles from "assets/jss/material-dashboard-react/views/createNewProductStyle.js";

const useStyles = makeStyles(styles);

export default function CreatePage(props) {
  const classes = useStyles();

  const { item } = props;

  const [productId, setProductId] = useState('');
  const [brand, setBrand] = useState('');
  const [details, setDetails] = useState('');
  const [price, setPrice] = useState('');
  const [retailer, setRetailer] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [updated, setUpdated] = useState(false);
  const [updateTest, setUpdateTest] = useState(true);
  const [updateStaging, setUpdateStaging] = useState(true);
  const [updateProd, setUpdateProd] = useState(true);
  const [priceError, setPriceError] = useState(false);
  const [productUrlError, setProductUrlError] = useState(false);
  const [imageUrlError, setImageUrlError] = useState(false);

  useEffect( () => {
    setRetailer(forms.getRetailerFromUrl(item.url));
    setProductUrl(item.url);
    setBrand(item.site_name || '');
    setDetails(item.title || '');
    setPrice(item.price || '');
    setImageUrl(item.image || '');
  }, [item]);

  const validateForm = () => {
    return (
      brand.length > 0 &&
      details.length > 0 &&
      retailer.length > 0 &&
      productUrl.length > 0 &&
      imageUrl.length > 0 &&
      price.length > 0 &&
      !(priceError) &&
      !(productUrlError) &&
      !(imageUrlError) &&
      forms.validateEnvironments(updateTest, updateStaging, updateProd)
    );
  }

  const create = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    var body = {
      "brand": brand,
      "details": details,
      "price": price,
      "retailer": retailer,
      "productUrl": productUrl,
      "imageUrl": imageUrl,
      "test": updateTest,
      "staging": updateStaging,
      "prod": updateProd
    }

    try {
      const response = await createProduct(body);
      console.log('Response: ' + JSON.stringify(response));
      setIsUpdating(false);
      setProductId(response.productId);
      setUpdated(true);
      setUpdateError('');
    } catch (e) {
      const r = e.response.data;
      console.log("Response: " + JSON.stringify(r))

      onError(e);
      setIsUpdating(false);
      setUpdateError(r.error);

      if ('productId' in r) {
        setProductId(r.productId);
      }
    }
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Enter New Product Details</h4>
              <p className={classes.cardCategoryWhite}>Enter details for new product below, ensuring that the product link contains any affiliate tags.</p>
            </CardHeader>
            <CardBody>
              <form onSubmit={create}>
                <ProductForm
                  isUpdating={isUpdating}
                  updated={updated}
                  brand={brand}
                  setBrand={setBrand}
                  retailer={retailer}
                  setRetailer={setRetailer}
                  price={price}
                  setPrice={setPrice}
                  priceError={priceError}
                  setPriceError={setPriceError}
                  details={details}
                  setDetails={setDetails}
                  productUrl={productUrl}
                  setProductUrl={setProductUrl}
                  productUrlError={productUrlError}
                  setProductUrlError={setProductUrlError}
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  imageUrlError={imageUrlError}
                  setImageUrlError={setImageUrlError}
                />
                <GridContainer>
                  <GridItem xs={12} sm={7} md={7}>
                    <Environments
                      updateTest={updateTest}
                      setUpdateTest={setUpdateTest}
                      updateStaging={updateStaging}
                      setUpdateStaging={setUpdateStaging}
                      updateProd={updateProd}
                      setUpdateProd={setUpdateProd}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={5} md={5}>
                    <FormButtons
                      updated={updated}
                      validate={validateForm}
                      alternateAction={props.clearSearch}
                      submitLabel="Create"
                      successLabel="Create Next"
                    />
                  </GridItem>
                </GridContainer>
              </form>
            </CardBody>
            <Result
              successMessage={productId && "New products Id: " + productId}
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
    </div>
  );
}

CreatePage.propTypes = {
  item: PropTypes.object
};
