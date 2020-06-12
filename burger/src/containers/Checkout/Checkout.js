import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  checkoutCancelHandler = () => {
    this.props.history.goBack(); //
  };

  checkoutContinueHandler = () => {
    this.props.history.replace(this.props.match.path + "/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          onCheckoutCancel={this.checkoutCancelHandler}
          onCheckoutContinue={this.checkoutContinueHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { ings: state.ingredients };
};
export default connect(mapStateToProps, null)(Checkout);
