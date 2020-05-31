import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import "./ContactData.css";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };
  orderHandler = (ev) => {
    ev.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: "Jhimy",
        address: { street: "test street 1 ", zipcode: "1" },
        email: "test@gmail.com",
        country: "Bolivia",
      },
      deliverMethod: "fastest",
    };

    axios
      .post("/orders.json", order)
      .then((response) => {
        console.log(response);
        this.setState({ loading: false, purchasing: false });
        this.props.history.push("/");
      })
      .catch((err) => {
        console.err(err);
        this.setState({ loading: false, purchasing: false });
      });
    console.log(this.props.ingredients);
  };
  render() {
    let form = (
      <form>
        <input type="text" name="name"></input>
        <input type="email" name="email"></input>
        <input type="street" name="street"></input>
        <input type="postalCode" name="postalCode"></input>
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className="ContactData">
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
