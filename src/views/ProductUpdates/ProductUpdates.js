import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui icons
import Edit from "@material-ui/icons/Edit";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
// libs
import { useAppContext } from "libs/contextLib";
import { getNotFoundItems } from "libs/apiLib.js";
import { onError } from "libs/errorLib";

import styles from "assets/jss/material-dashboard-react/views/productUpdatesStyle.js";

const useStyles = makeStyles(styles);

export default function ProductUpdates() {
  const { mobile } = useAppContext();

  const [items, setItems] = useState(0);

  // Make API Call to get table data
  useEffect( () => {
    async function getItems(){
      let response;
      try {
        response = await getNotFoundItems();
        setItems(response.items);
      } catch (e) {
        onError(e);
      }
    }

    getItems();
  }, []);

  const renderProducts = () => {
    const allproducts = Object.entries(items).map(
        ([key, p]) =>
          mobile
            ? [p['brand'], p['details']]
            : [
                <Link to={"/admin/product-updates/" + p['productId']} className={classes.tableLink}>
                  {p['brand']}
                </Link>,
                <Link to={"/admin/product-updates/" + p['productId']} className={classes.tableLink}>
                  {p['details']}
                </Link>,
                <Link to={"/admin/product-updates/" + p['productId']} className={classes.tableLink}>
                  {p['productUrl']}
                </Link>,
                <Link to={"/admin/product-updates/" + p['productId']} className={classes.iconLink}>
                  <Edit />
                </Link>

            ]
      );

    return allproducts
  }

  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>NotFound Items</h4>
            <p className={classes.cardCategoryWhite}>
              Check the products below to ensure their details are accurate and then update the price and image
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={ mobile
                ? ["Brand", "Details", ""]
                : ["Brand", "Details", "Url", ""]
              }
              tableData={
                renderProducts()
              }
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
