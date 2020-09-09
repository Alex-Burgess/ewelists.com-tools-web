import React from 'react';
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import ErrorText from "components/Typography/Danger.js";

import styles from "assets/jss/material-dashboard-react/components/productStyle.js";
const useStyles = makeStyles(styles);

export default function ProductSidebar(props) {
  const classes = useStyles();
  const { loading, error, brand, details, price, retailer  } = props;

  return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card className={classes.cardSidebar}>
            <CardBody>
              <h4 className={classes.cardTitle}>Product Query Info</h4>
              { loading
                ? <CircularProgress />
                : error
                  ? <ErrorText>{error}</ErrorText>
                  : <ul>
                      <li><b>retailer: </b> {retailer}</li>
                      <li><b>Brand: </b> {brand}</li>
                      <li><b>details: </b> {details}</li>
                      <li><b>price: </b> {price}</li>
                    </ul>
              }
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
  );
}

ProductSidebar.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  brand: PropTypes.string,
  details: PropTypes.string,
  price: PropTypes.string,
  retailer: PropTypes.string
};
