import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuiildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {
  addIngredient,
  removeIngredient,
  initIngredients,
  purchaseInit,
} from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };
  componentDidMount() {
    console.log(this.props);
    this.props.onInitIngredient();
  }

  modalHandler = () => {
    this.setState({ purchasing: true });
  };
  modalClose = () => {
    this.setState({ purchasing: false });
  };

  changePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseContinueHandler = () => {
    // alert("COMO ES CHOQUITO");
    this.props.onInitiPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        {this.props.ings ? (
          <>
            <Modal show={this.state.purchasing} modalClose={this.modalClose}>
              {this.state.loading ? (
                this.props.error ? (
                  <p>Vecinos salgan!!!</p>
                ) : (
                  <Spinner />
                )
              ) : (
                <OrderSummary
                  ingredients={this.props.ings}
                  modalClose={this.modalClose}
                  continuePurchase={this.purchaseContinueHandler}
                  totalPrice={this.props.price}
                />
              )}
            </Modal>
            <Burger ingredients={this.props.ings} />
            <BuildControls
              price={this.props.price}
              disabled={disabledInfo}
              purchasable={this.changePurchaseState(this.props.ings)}
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemove}
              handleModal={this.modalHandler}
            />
          </>
        ) : this.props.error ? (
          <p>Vecinos salgan!!!</p>
        ) : (
          <Spinner />
        )}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(addIngredient(ingName)),
    onIngredientRemove: (ingName) => dispatch(removeIngredient(ingName)),
    onInitIngredient: () => dispatch(initIngredients()),
    onInitiPurchase: () => dispatch(purchaseInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
