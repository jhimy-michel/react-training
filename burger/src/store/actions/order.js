import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_INIT,
} from "./actionsTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return { type: PURCHASE_BURGER_SUCCESS, orderId: id, orderData: orderData };
};

export const purchaseBurgerFail = (error) => {
  return { type: PURCHASE_BURGER_FAIL, error };
};

export const purchaseBurgerStart = () => {
  return { type: PURCHASE_BURGER_START };
};
export const purchaseBurger = (order) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json", order)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, order));
      })
      .catch((err) => {
        console.err(err);
        dispatch(purchaseBurgerFail(err));
      });
  };
};

export const purchaseInit = () => {
  return { type: PURCHASE_INIT };
};
