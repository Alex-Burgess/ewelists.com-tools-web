import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
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
import { getNotFoundItem, updateNotfoundProduct } from "libs/apiLib.js";
import { onError } from "libs/errorLib";

import styles from "assets/jss/material-dashboard-react/views/updateUsersGiftsStyle.js";

const useStyles = makeStyles(styles);

export default function UpdateProducts(props) {
  const classes = useStyles();

  const productId = props.match.params.id;

  const [brand, setBrand] = useState('');
  const [details, setDetails] = useState('');
  const [price, setPrice] = useState('');
  const [retailer, setRetailer] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [loadError, setLoadError] = useState('');
  const [updated, setUpdated] = useState(false);

  // Make API Call to get table data
  useEffect( () => {
    async function getItems(){
      let response;
      try {
        response = await getNotFoundItem(productId);
        setBrand(response.brand);
        setDetails(response.details);
        setProductUrl(response.productUrl);
      } catch (e) {
        onError(e);
        setLoadError('No product exists with this id: ' + productId)
      }
    }

    getItems();
  }, [productId]);

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
      await updateNotfoundProduct(body, productId);
      setIsUpdating(false);
      setUpdated(true);
      setUpdateError('');
    } catch (e) {
      onError(e);
      setIsUpdating(false);
      setUpdateError(e.response.data.error);
    }
  }

  return (
    <div>
      { loadError
        ? <div>
            {loadError}
            <br />
            <Link to={"/admin/product-updates"}>
              Back to table
            </Link>
          </div>
        : <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Product ID: {productId} </h4>
                  <p className={classes.cardCategoryWhite}>Check the following details and update the price and image.  Update link with any affiliate required configuration.</p>
                </CardHeader>
                <CardBody>
                  <form onSubmit={updateProduct}>
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
                        <Button color="primary" disabled={!validateForm() || updated} type="submit">
                          { updated
                            ? <span>Success!</span>
                            : <span>Update Product</span>
                          }
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </form>
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
                <GridItem xs={12} sm={12} md={12}>
                  <Link to={"/admin/update-users-gifts"}>
                    Back to table
                  </Link>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
      }
    </div>
  );
}
