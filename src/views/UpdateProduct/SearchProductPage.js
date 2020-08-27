import React, { useState } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui icons
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import ErrorText from "components/Typography/Danger.js";
// Sections
import UpdateProduct from "./UpdateProduct.js";
// libs
import { getProductItem } from "libs/apiLib.js";
import { onError } from "libs/errorLib";

import styles from "assets/jss/material-dashboard-react/views/updateProductStyle.js";

const useStyles = makeStyles(styles);

export default function SearchProductPage() {
  const [searchId, setSearchId] = useState('');
  const [itemExists, setItemExists] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  const [item, setItem] = useState({});


  const validateSearch = () => {
    return (
      searchId.length > 16
    );
  }

  const searchProduct = async () => {
    setIsSearching(true);

    let response;
    try {
      response = await getProductItem(searchId);
      console.log('Response: ' + JSON.stringify(response));
      setItem(response)
      setIsSearching(false);
      setItemExists(true);
    } catch (e) {
      onError(e);
      setIsSearching(false)
      setSearchError(e.response.data.error);
    }

    return null
  }

  const clearSearch = () => {
    setSearchId('')
    setItemExists(false)
    setSearchError('')
  }

  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardBody>
              <h4 className={classes.searchTitle}>Search For Product</h4>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      id="search-id"
                      formControlProps={{
                        fullWidth: false,
                        className: classes.customFormControl
                      }}
                      inputProps={{
                        placeholder: "Enter Product ID...",
                        onChange: event => setSearchId(event.target.value),
                        value: searchId
                      }}
                    />
                    <div className={classes.buttonContainer}>
                      <Button color="primary" justIcon onClick={() => searchProduct()} disabled={!validateSearch() || isSearching}>
                        <Search />
                      </Button>
                      <Button justIcon onClick={() => clearSearch('')}>
                        <Clear />
                      </Button>
                    </div>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              {searchError
                ? <div className={classes.errorContainer}>
                    <ErrorText>
                      <p>{searchError}</p>
                    </ErrorText>
                  </div>
                : null
              }
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      { itemExists
        ? <UpdateProduct item={item} clearSearch={clearSearch}/>
        : null
      }
    </div>
  );
}
