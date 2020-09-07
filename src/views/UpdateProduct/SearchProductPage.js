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
import SuccessText from "components/Typography/Success.js";
// Sections
import UpdateProduct from "./UpdateProduct.js";
// libs
import { checkProductAcrossEnvironments } from "libs/apiLib.js";
import { onError } from "libs/errorLib";

import styles from "assets/jss/material-dashboard-react/views/updateProductStyle.js";

const useStyles = makeStyles(styles);

export default function SearchProductPage() {
  const [searchId, setSearchId] = useState('');
  const [itemExists, setItemExists] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  const [item, setItem] = useState({});
  const [environmentStates, setEnvironmentStates] = useState({});


  const validateSearch = () => {
    return (
      searchId.length > 16
    );
  }

  const searchProduct = async (e) => {
    e.preventDefault();
    setIsSearching(true);

    let response;
    try {
      response = await checkProductAcrossEnvironments(searchId);
      setItem(response.product);
      setEnvironmentStates(response.test_environment_states);
      setIsSearching(false);
      setItemExists(true);
      setSearchError('');
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
    setEnvironmentStates({})
  }

  const renderEnvironmentStates = (states) => {
    console.log("Rendering states: " + JSON.stringify(states))
    return (
      <div className={classes.errorContainer}>
        <h4 className={classes.searchTitle}>Comparing product across environments:</h4>
        <ul>
          {Object.entries(states).map(([key,value])=>{
            if (value.toString() === "IN SYNC") {
              return (
                  <li key={key}>{key} : <div className={classes.state}><SuccessText>{value.toString()} </SuccessText></div></li>
              );
            } else {
              return (
                  <li key={key}>{key} : <div className={classes.state}><ErrorText>{value.toString()} </ErrorText></div></li>
              );
            }
           })}
        </ul>
      </div>

    )
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
                  <form onSubmit={searchProduct}>
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
                      <Button color="primary" justIcon disabled={!validateSearch() || isSearching} type="submit">
                        <Search />
                      </Button>
                      <Button justIcon onClick={() => clearSearch('')}>
                        <Clear />
                      </Button>
                    </div>
                  </form>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              {Object.keys(environmentStates).length > 0
                ? renderEnvironmentStates(environmentStates)
                : null
              }
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
