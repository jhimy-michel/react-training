import React, { Component } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { fetchOrders } from "../../store/actions/order";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    this.props.onFetchOrders();
  }
  render() {
    return (
      <div>
        {this.props.orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}
const mapToDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(fetchOrders()),
  };
};
const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
  };
};

export default connect(
  mapStateToProps,
  mapToDispatchToProps
)(withErrorHandler(Orders, axios));
