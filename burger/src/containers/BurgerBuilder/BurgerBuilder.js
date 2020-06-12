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
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };
  componentDidMount() {
    console.log(this.props);
    /* axios
      .get("https://jhimbo-29c55.firebaseio.com/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ error: true });
      }); */
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
    const paramsQ = [];

    for (let i in this.state.ingredients) {
      paramsQ.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    paramsQ.push("price=" + this.state.totalPrice);
    const queryString = paramsQ.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
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
                this.state.error ? (
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
        ) : this.state.error ? (
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
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemove: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
