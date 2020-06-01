import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import "./ContactData.css";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Your Name" },
        value: "",
        validation: {
          required: true,
          minLength: 3,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Street" },
        value: "",
        validation: {
          required: true,
          minLength: 3,
        },
        valid: false,
        touched: false,
      },
      zipcode: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "ZipCode" },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: { type: "email", placeholder: "Your email" },
        value: "",
        validation: {
          required: true,
          minLength: 3,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Country" },
        value: "",
        validation: {
          required: true,
          minLength: 3,
        },
        valid: false,
        touched: false,
      },
      deliverMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {},
        valid: true,
      },
    },
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    formIsValid: false,
    loading: false,
  };

  validateForm = (value, rules) => {
    let isValid = true;
    if (!rules) return true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.minLength && isValid;
    }
    return isValid;
  };

  orderHandler = (ev) => {
    ev.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formEl in this.state.orderForm) {
      formData[formEl] = this.state.orderForm[formEl].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
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
  onChange = (ev, inputIdentifier) => {
    console.log(ev.target.value);
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedOrderFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedOrderFormElement.value = ev.target.value;
    updatedOrderFormElement.valid = this.validateForm(
      updatedOrderFormElement.value,
      updatedOrderFormElement.validation
    );
    updatedOrderFormElement.touched = true;

    updatedOrderForm[inputIdentifier] = updatedOrderFormElement;
    console.log(updatedOrderForm);

    let isFormValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      isFormValid = updatedOrderForm[inputIdentifier].valid && isFormValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: isFormValid });
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({ id: key, config: this.state.orderForm[key] });
    }
    let form = (
      <form>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            handleChange={(event) => this.onChange(event, formElement.id)}
          />
        ))}
        <Button
          btnType="Success"
          disabled={!this.state.formIsValid}
          clicked={this.orderHandler}
        >
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
