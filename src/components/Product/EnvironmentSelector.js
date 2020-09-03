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
  const { testChecked, stagingChecked, prodChecked, handleToggle  } = props;

  return (
    <div className={classes.buttonContainer}>
      <span>
        Test
      </span>
      <Checkbox
        checked={testChecked}
        tabIndex={-1}
        onClick={() => handleToggle('test')}
        checkedIcon={<Check className={classes.checkedIcon} />}
        icon={<Check className={classes.uncheckedIcon} />}
        classes={{
          checked: classes.checked,
          root: classes.root
        }}
      />
      <span>
        Staging
      </span>
      <Checkbox
        checked={stagingChecked}
        tabIndex={-1}
        onClick={() => handleToggle('staging')}
        checkedIcon={<Check className={classes.checkedIcon} />}
        icon={<Check className={classes.uncheckedIcon} />}
        classes={{
          checked: classes.checked,
          root: classes.root
        }}
      />
      <span>
        Prod
      </span>
      <Checkbox
        checked={prodChecked}
        tabIndex={-1}
        onClick={() => handleToggle('prod')}
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
  testChecked: PropTypes.string,
  stagingChecked: PropTypes.string,
  prodChecked: PropTypes.string,
  handleToggle: PropTypes.func
};
