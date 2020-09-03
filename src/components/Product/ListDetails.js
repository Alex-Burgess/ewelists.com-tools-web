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
  const { listOwner, listTitle, listUrl } = props;

  return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card className={classes.cardSidebar}>
            <CardBody>
              <h4 className={classes.cardTitle}>List Details</h4>
              <div>
                Added by: {listOwner}
              </div>
              <a href={listUrl} target="_blank" rel="noopener noreferrer">{listTitle}</a>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
  );
}

ProductSidebar.propTypes = {
  listOwner: PropTypes.string,
  listTitle: PropTypes.string,
  listUrl: PropTypes.string
};
