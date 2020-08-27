import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import ErrorText from "components/Typography/Danger.js";
// libs
import { updateProductItem } from "libs/apiLib.js";
import { onError } from "libs/errorLib";

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
  // const [loadError, setLoadError] = useState('');
  const [updated, setUpdated] = useState(false);

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
      imageUrl.length > 0
    );
  }

  const updateProduct = async () => {
    setIsUpdating(true);

    var body = {
      "brand": brand,
      "details": details,
      "price": price,
      "retailer": retailer,
      "productUrl": productUrl,
      "imageUrl": imageUrl
    }

    let response;
    try {
      response = await updateProductItem(body, productId);
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
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: isUpdating || updated,
                      value: price,
                      onChange: event => setPrice(event.target.value)
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
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: isUpdating || updated,
                      multiline: true,
                      rows: 2,
                      value: productUrl,
                      onChange: event => setProductUrl(event.target.value)
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Image Link"
                    id="image-link"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: isUpdating || updated,
                      multiline: true,
                      rows: 2,
                      value: imageUrl,
                      onChange: event => setImageUrl(event.target.value)
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <div className={classes.buttonContainer}>
                    <Button color="primary" disabled={!validateForm() || updated} onClick={updateProduct}>
                      { updated
                        ? <span>Success!</span>
                        : <span>Update Product</span>
                      }
                    </Button>
                    { updated
                      ? <Button color="success" onClick={props.clearSearch}>
                          Update Next Product
                        </Button>
                      : <Button color="default" onClick={props.clearSearch}>
                          Clear Form
                        </Button>
                    }
                  </div>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              {updateError
                ? <div className={classes.errorContainer}>
                    <ErrorText>
                      <p>{updateError}</p>
                    </ErrorText>
                  </div>
                : null
              }
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardBody>
                  <h4 className={classes.cardTitle}>Product Link</h4>
                  <a href={productUrl} target="_blank" rel="noopener noreferrer">{brand} - {details}</a>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardBody>
                  <h4 className={classes.cardTitle}>Product Image</h4>
                  <img src={imageUrl} className={classes.productImage} alt="..." />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
  );
}

UpdateProduct.propTypes = {
  item: PropTypes.object
};
