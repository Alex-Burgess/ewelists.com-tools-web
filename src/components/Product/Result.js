import React from 'react';
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import CardFooter from "components/Card/CardFooter.js";
import ErrorText from "components/Typography/Danger.js";
import SuccessText from "components/Typography/Success.js";

import styles from "assets/jss/material-dashboard-react/components/productStyle.js";
const useStyles = makeStyles(styles);

export default function ProductResults(props) {
  const classes = useStyles();
  const { successMessage, errorMessage  } = props;

  return (
    <CardFooter className={classes.results}>
      {successMessage
        ? <SuccessText>
            <p>{successMessage}</p>
          </SuccessText>
        : null
      }
      {errorMessage
        ? <ErrorText>
            <p>{errorMessage}</p>
          </ErrorText>
        : null
      }
    </CardFooter>
  );
}

ProductResults.propTypes = {
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string
};
