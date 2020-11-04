import React from 'react';
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";

import styles from "assets/jss/material-dashboard-react/components/productStyle.js";
const useStyles = makeStyles(styles);

export default function EnvironmentSelector(props) {
  const classes = useStyles();
  const { searchHidden,  setSearchHidden } = props;

  const toggleSearchHidden = () => {
      if (searchHidden) {
        setSearchHidden(false)
      } else {
        setSearchHidden(true)
      }
  };

  return (
    <div className={classes.buttonContainer}>
      <span>
        Show in search results:
      </span>
      <Checkbox
        checked={searchHidden}
        tabIndex={-1}
        onClick={() => toggleSearchHidden()}
        checkedIcon={<Check className={classes.checkedIcon} />}
        icon={<Check className={classes.uncheckedIcon} />}
        classes={{
          checked: classes.checked,
          root: classes.root
        }}
      />
    </div>
  );
}

EnvironmentSelector.propTypes = {
  searchHidden: PropTypes.bool,
  setSearchHidden: PropTypes.func
};
