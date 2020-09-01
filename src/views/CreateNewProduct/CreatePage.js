import React, { useState } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
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
import SuccessText from "components/Typography/Success.js";
// libs
import { createProduct } from "libs/apiLib.js";
import { onError } from "libs/errorLib";

import styles from "assets/jss/material-dashboard-react/views/createNewProductStyle.js";

const useStyles = makeStyles(styles);

export default function CreateNewProduct(props) {
  const classes = useStyles();

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

  const handleToggle = value => {
    switch (value) {
      case "test":
        if (updateTest) {
          setUpdateTest(false)
        } else {
          setUpdateTest(true)
        }
        break;
      case "staging":
        if (updateStaging) {
          setUpdateStaging(false)
        } else {
          setUpdateStaging(true)
        }
        break;
      case "prod":
        if (updateProd) {
          setUpdateProd(false)
        } else {
          setUpdateProd(true)
        }
        break;
      default:
        break;
    }
  };

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

  const updateImageUrl = (url) => {
    if (url.includes('amazon.co.uk')) {
      var image = url.match(/src="(.*)" ></);
      console.log("amazon image url: " + image[1])
      setImageUrl(image[1])
    } else {
      setImageUrl(url)
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
      "imageUrl": imageUrl,
      "test": updateTest,
      "staging": updateStaging,
      "prod": updateProd
    }

    let response;
    try {
      response = await createProduct(body);
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

  const nextProduct = () => {
    setProductId('');
    setBrand('');
    setDetails('');
    setPrice('');
    setRetailer('');
    setProductUrl('');
    setImageUrl('');
    setUpdateError('');
    setUpdated(false);
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
                        onChange: event => updateImageUrl(event.target.value)
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <div className={classes.buttonContainer}>
                      <span>
                        Test
                      </span>
                      <Checkbox
                        checked={updateTest}
                        tabIndex={-1}
                        onClick={() => handleToggle('test')}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked,
                          root: classes.root
                        }}
                      />
                      <span>
                        Staging
                      </span>
                      <Checkbox
                        checked={updateStaging}
                        tabIndex={-1}
                        onClick={() => handleToggle('staging')}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked,
                          root: classes.root
                        }}
                      />
                      <span>
                        Prod
                      </span>
                      <Checkbox
                        checked={updateProd}
                        tabIndex={-1}
                        onClick={() => handleToggle('prod')}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked,
                          root: classes.root
                        }}
                      />
                  </div>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <div className={classes.buttonContainer}>
                      <Button color="primary" disabled={!validateForm() || updated} type="submit">
                        { updated
                          ? <span>Success!</span>
                          : <span>Create</span>
                        }
                      </Button>
                      { updated
                        ? <Button color="success" onClick={nextProduct}>
                            Create Next
                          </Button>
                        : <Button onClick={nextProduct}>
                            Clear
                          </Button>
                      }
                    </div>
                  </GridItem>
                </GridContainer>
              </form>
            </CardBody>
            <CardFooter className={classes.results}>
              {productId
                ? <SuccessText>
                    <p>New products Id: {productId}</p>
                  </SuccessText>
                : null
              }
              {updateError
                ? <ErrorText>
                    <p>{updateError}</p>
                  </ErrorText>
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
    </div>
  );
}
