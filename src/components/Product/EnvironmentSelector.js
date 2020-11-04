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
  const { updateTest, updateStaging, updateProd, setUpdateTest, setUpdateStaging, setUpdateProd } = props;

  const handleToggle = value => {
    switch (value) {
      case "test":
        if (updateTest) {
          setUpdateTest(false)
        } else {
          setUpdateTest(true)
        }
        break;
      case "staging":
        if (updateStaging) {
          setUpdateStaging(false)
        } else {
          setUpdateStaging(true)
        }
        break;
      case "prod":
        if (updateProd) {
          setUpdateProd(false)
        } else {
          setUpdateProd(true)
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes.buttonContainer}>
      <span>
        Test
      </span>
      <Checkbox
        checked={updateTest}
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
        checked={updateStaging}
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
        checked={updateProd}
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
  updateTest: PropTypes.bool,
  updateStaging: PropTypes.bool,
  updateProd: PropTypes.bool,
  setUpdateTest: PropTypes.func,
  setUpdateStaging: PropTypes.func,
  setUpdateProd: PropTypes.func
};
