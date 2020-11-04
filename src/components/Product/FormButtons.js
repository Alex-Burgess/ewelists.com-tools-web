import React from 'react';
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-react/components/productStyle.js";
const useStyles = makeStyles(styles);

export default function FormButtons(props) {
  const classes = useStyles();
  const { updated, validate, alternateLabel, alternateAction, submitLabel, successLabel } = props;

  return (
    <div className={classes.buttonContainer}>
      <Button color="primary" disabled={!validate() || updated} type="submit" data-cy="submit-button" className={classes.formButton}>
        { updated
          ? <span>Success!</span>
          : <span>{submitLabel}</span>
        }
      </Button>
      { updated
        ? <Button color="success" onClick={alternateAction} data-cy="alt-button" className={classes.formButton}>
            {successLabel}
          </Button>
        : <Button onClick={alternateAction} data-cy="alt-button">
            {alternateLabel ? alternateLabel : "Clear"}
          </Button>
      }
    </div>
  );
}

FormButtons.propTypes = {
  updated: PropTypes.bool,
  validate: PropTypes.func,
  submitLabel: PropTypes.string,
  successLabel: PropTypes.string,
  alternateLabel: PropTypes.string,
  alternateAction: PropTypes.func
};
