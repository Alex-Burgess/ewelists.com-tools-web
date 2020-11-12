import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
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
import Result from "components/Product/Result.js"
import ProductSidebar from "components/Product/Sidebar.js";
import ListDetails from "components/Product/ListDetails.js";
import Search from "components/Product/SearchSelector.js"
// libs
import { getNotFoundItem, updateNotfoundProduct } from "libs/apiLib.js";
import { onError } from "libs/errorLib";
import { getRetailerFromUrl } from "libs/formsLib";
import config from 'config.js';

import styles from "assets/jss/material-dashboard-react/views/updateUsersGiftsStyle.js";

const useStyles = makeStyles(styles);

export default function UpdateProducts(props) {
  const classes = useStyles();
  const history = useHistory();

  const productId = props.match.params.id;

  const [listOwner, setListOwner] = useState('');
  const [listTitle, setListTitle] = useState('');
  const [listUrl, setListUrl] = useState('');

  const [newProductId, setNewProductId] = useState('');

  const [brand, setBrand] = useState('');
  const [details, setDetails] = useState('');
  const [price, setPrice] = useState('');
  const [retailer, setRetailer] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [searchHidden, setSearchHidden] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);
  const [updated, setUpdated] = useState(false);

  const [updateError, setUpdateError] = useState('');
  const [loadError, setLoadError] = useState('');
  const [priceError, setPriceError] = useState(false);
  const [productUrlError, setProductUrlError] = useState(false);
  const [imageUrlError, setImageUrlError] = useState(false);

  // Make API Call to get table data
  useEffect( () => {
    async function getItems(){
      let response;
      try {
        response = await getNotFoundItem(productId);
        setBrand(response.brand);
        setDetails(response.details);
        setProductUrl(response.productUrl);
        setListOwner(response.creatorsName);
        setListTitle(response.listTitle);
        setListUrl(config.mainSiteDomain + '/lists/' + response.listId);

        if (response.price) {
            setPrice(response.price);
        }

        if (response.imageUrl) {
            setImageUrl(response.imageUrl);
        }
      } catch (e) {
        onError(e);
        setLoadError('No product exists with this id: ' + productId)
      }

      // Get retailer
      const retailer = getRetailerFromUrl(response.productUrl);
      setRetailer(retailer);
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
      imageUrl.length > 0 &&
      !(priceError) &&
      !(productUrlError) &&
      !(imageUrlError)
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

    if (searchHidden) {
      body['searchHidden'] = searchHidden;
    }

    try {
      const response = await updateNotfoundProduct(body, productId);
      setNewProductId(response['products-product-created_succeeded'].productId.S);

      setIsUpdating(false);
      setUpdated(true);
      setUpdateError('');
    } catch (e) {
      onError(e);
      setIsUpdating(false);
      setUpdateError(e.response.data.error);
    }
  }

  const redirectToTable = () => {
    history.push("/admin/update-users-gifts");
  }

  return (
    <div>
      { loadError
        ? <div>
            {loadError}
            <br />
            <Link to={"/admin/update-users-gifts"}>
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
                      <GridItem xs={12} sm={6} md={6}>
                        <Search
                          searchHidden={searchHidden}
                          setSearchHidden={setSearchHidden}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6}>
                        <FormButtons
                          updated={updated}
                          validate={validateForm}
                          submitLabel="Update"
                          successLabel="Update Next"
                          alternateLabel="Back"
                          alternateAction={redirectToTable}
                        />
                      </GridItem>
                    </GridContainer>
                  </form>
                </CardBody>
                <Result
                  successMessage={newProductId && "New products Id: " + newProductId}
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
              <ListDetails
                listOwner={listOwner}
                listTitle={listTitle}
                listUrl={listUrl}
              />
            </GridItem>
          </GridContainer>
      }
    </div>
  );
}
