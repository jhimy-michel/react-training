import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuiildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };
  componentDidMount() {
    console.log(this.props);
    axios
      .get("https://jhimbo-29c55.firebaseio.com/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ error: true });
      });
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
    this.setState({ purchasable: sum > 0 });
  }
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCounted = oldCount + 1;
    const updatedIngredient = {
      ...this.state.ingredients,
    };
    updatedIngredient[type] = updatedCounted;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });
    this.changePurchaseState(updatedIngredient);
  };
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCounted = oldCount - 1;
    const updatedIngredient = {
      ...this.state.ingredients,
    };
    updatedIngredient[type] = updatedCounted;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });
    this.changePurchaseState(updatedIngredient);
  };
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
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        {this.state.ingredients ? (
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
                  ingredients={this.state.ingredients}
                  modalClose={this.modalClose}
                  continuePurchase={this.purchaseContinueHandler}
                  totalPrice={this.state.totalPrice}
                />
              )}
            </Modal>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls
              price={this.state.totalPrice}
              disabled={disabledInfo}
              purchasable={this.state.purchasable}
              ingredientAdded={this.addIngredientHandler}
              ingredientRemoved={this.removeIngredientHandler}
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

export default withErrorHandler(BurgerBuilder, axios);
