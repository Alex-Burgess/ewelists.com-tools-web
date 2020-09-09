import React from 'react';
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-react/components/productStyle.js";
const useStyles = makeStyles(styles);

export default function ProductSidebar(props) {
  const classes = useStyles();
  const { brand, details, productUrl, imageUrl  } = props;

  return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card className={classes.cardSidebar}>
            <CardBody>
              <h4 className={classes.cardTitle}>Product Details</h4>
              <a href={productUrl} target="_blank" rel="noopener noreferrer">{brand} - {details}</a>
              <br />
              <img src={imageUrl} className={classes.productImage} alt="..." />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
  );
}

ProductSidebar.propTypes = {
  brand: PropTypes.string,
  details: PropTypes.string,
  productUrl: PropTypes.string,
  imageUrl: PropTypes.string
};
