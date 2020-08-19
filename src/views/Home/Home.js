import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
// libs
import { useAppContext } from "libs/contextLib";
import { onError } from "libs/errorLib";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Input from "components/CustomInput/CustomInput.js";
import ErrorText from "components/Typography/Danger.js";

import logo from "assets/img/logo-blue.svg";

import styles from "assets/jss/material-dashboard-react/views/homeStyle.js";
const useStyles = makeStyles(styles);


export default function Home() {
  const classes = useStyles();
  const history = useHistory();

  const { isAuthenticated, userHasAuthenticated } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  useEffect( () => {
    if (isAuthenticated) {
      history.push("/admin/dashboard");
    }
  }, [isAuthenticated, history]);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();


    try {
      await Auth.signIn(email, password);
      userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      onError(e);

      if (e.message) {
        setError(e.message);
      }
    }
  }


  return (
    <div className={classes.page}>
      <GridContainer justify="center">
        <GridItem xs={11} sm={10} md={5}>
          <Card className={classes.cardLogin}>
            <CardBody>
              <div className={classes.logo}>
                <img src={logo} alt="logo" className={classes.logoImg} />
              </div>
              <h1 className={classes.title + " " + classes.textCenter}>ewelists admin tools</h1>
              <form onSubmit={handleSubmit}>
                <Input
                  labelText="Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true,
                    value: email,
                    onChange: event => setEmail(event.target.value)
                  }}
                />
                <Input
                  labelText="Password"
                  id="password"
                  formControlProps={{
                    fullWidth: true,
                    value: email,
                    onChange: event => setPassword(event.target.value)
                  }}
                  inputProps={{
                    type: "password",
                    autoComplete: "off"
                  }}
                />
                { error
                  ? <div className={classes.textCenter}>
                      <ErrorText>
                        <p>{error}</p>
                      </ErrorText>
                    </div>
                  : null
                }
                <Button fullWidth color="primary" type="submit" data-cy="login" disabled={!validateForm()}>
                  Login
                </Button>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
