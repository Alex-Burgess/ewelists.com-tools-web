import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function TableList() {
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
            : [p['brand'], p['details'], <a href={p['productUrl']} target="_blank" rel="noopener noreferrer">{p['productUrl']}</a>]
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
                ? ["Brand", "Details"]
                : ["Brand", "Details", "Url"]
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