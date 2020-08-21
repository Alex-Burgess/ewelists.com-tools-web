import React from "react";
import { Route, Switch } from "react-router-dom";

import AuthenticatedRoute from "./components/Routes/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/Routes/UnauthenticatedRoute";

import Admin from "layouts/Admin.js";
import Home from "views/Home/Home";
import NotFound from "views/NotFound/NotFound";
import Logout from "views/Logout/Logout";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <UnauthenticatedRoute exact path="/login">
        <Home />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/logout">
        <Logout />
      </AuthenticatedRoute>
      <AuthenticatedRoute path="/admin" component={Admin} />
      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
