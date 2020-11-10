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
import CreatePage from "./CreatePage.js";
// libs
import { queryMetadata } from "libs/apiLib.js";
import { onError } from "libs/errorLib";

import styles from "assets/jss/material-dashboard-react/views/createNewProductStyle.js";

const useStyles = makeStyles(styles);

export default function SearchUrlPage() {
  const classes = useStyles();

  const [url, setUrl] = useState('');
  const [loadForm, setLoadForm] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [item, setItem] = useState({});

  const clearSearch = () => {
    setUrl('')
    setLoadForm(false)
    setSearchError('')
  }

  const validateSearch = () => {
    return (
      url.length > 0
    );
  }

  const searchUrl = async (e) => {
    e.preventDefault();
    setIsSearching(true);

    let response;
    try {
      response = await queryMetadata(url);
      response['url'] = url;
      setItem(response);
      setIsSearching(false);
      setLoadForm(true);
      setSearchError('');
    } catch (e) {
      onError(e);
      setItem({'url': url});
      setIsSearching(false)
      setLoadForm(true);
      setSearchError(e.response.data.error);
    }

    return null
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardBody>
              <h4 className={classes.searchTitle}>Search For Url</h4>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <form onSubmit={searchUrl}>
                    <CustomInput
                      id="search-url"
                      formControlProps={{
                        fullWidth: false,
                        className: classes.customFormControl
                      }}
                      inputProps={{
                        placeholder: "Enter Url...",
                        onChange: event => setUrl(event.target.value),
                        value: url
                      }}
                    />
                    <div className={classes.buttonContainer}>
                      <Button color="primary" justIcon disabled={!validateSearch() || isSearching} type="submit" data-cy="search-button">
                        <Search />
                      </Button>
                      <Button justIcon onClick={() => clearSearch('')} data-cy="clear-search-button">
                        <Clear />
                      </Button>
                    </div>
                  </form>
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
      { loadForm
        ? <CreatePage item={item} clearSearch={clearSearch}/>
        : null
      }
    </div>
  );
}
