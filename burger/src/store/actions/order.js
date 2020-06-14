import { PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAIL } from "./actionsTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return { type: PURCHASE_BURGER_SUCCESS, orderId: id, orderData: orderData };
};

export const purchaseBurgerFail = (error) => {
  return { type: PURCHASE_BURGER_FAIL, error };
};

export const purchaseBurgerStart = (order) => {
  return (dispatch) => {
    axios
      .post("/orders.json", order)
      .then((response) => {
        console.log(response);
        dispatch(purchaseBurgerSuccess(response.data, order));
      })
      .catch((err) => {
        console.err(err);
        dispatch(purchaseBurgerFail(err));
      });
  };
};
