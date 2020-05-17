import React from "react";
import Button from "../../components/UI/Button/Button";

const OrderSummay = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igr) => (
    <li key={igr}>
      <span style={{ textTransform: "capitalize" }}>{igr}</span> :{" "}
      {props.ingredients[igr]}
    </li>
  ));
  return (
    <>
      <h3>Your order</h3>
      <p>Delicous burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>TOTAL:</strong> {props.totalPrice.toFixed(2)} Bs.
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.modalClose}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.continuePurchase}>
        CONTINUE
      </Button>
    </>
  );
};

export default OrderSummay;
