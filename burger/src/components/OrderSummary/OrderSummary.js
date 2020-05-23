import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";

class OrderSummay extends Component {
  componentDidUpdate() {}
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map((igr) => (
      <li key={igr}>
        <span style={{ textTransform: "capitalize" }}>{igr}</span> :{" "}
        {this.props.ingredients[igr]}
      </li>
    ));
    return (
      <>
        <h3>Your order</h3>
        <p>Delicous burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>TOTAL:</strong> {this.props.totalPrice.toFixed(2)} Bs.
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.modalClose}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.continuePurchase}>
          CONTINUE
        </Button>
      </>
    );
  }
}

export default OrderSummay;
