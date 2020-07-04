import React, { useEffect } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import { authCheckState } from "./store/actions";
import asyncComponent from "./hoc/asyncComponents/asyncComponent";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});

const asyncOrders = asyncComponent(() => import("./containers/Orders/Orders"));

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});

function App(props) {
  useEffect(() => props.onTryAutoSignup());
  let routes;
  if (props.isAuthenticated) {
    routes = (
      <>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/orders" component={asyncOrders} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={asyncAuth} />
        <Redirect to="/" />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/" />
      </>
    );
  }
  return (
    <div className="App">
      <Layout>{routes}</Layout>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
