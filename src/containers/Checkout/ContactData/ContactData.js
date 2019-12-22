import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
export class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "manh hoang",
        adresse: {
          street: "10 rue baudin",
          zipCode: "93130",
          country: "France"
        },
        email: "test"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(res => {
        this.setState({ loading: false, purchasing: false });
        this.props.history.push("/")
      })
      .catch(err => this.setState({loading: false}));
  };

  render() {
      let form;
      if(this.state.loading){
          form = <Spinner />
      }
      else{
          form = (  <form>
            <input type="text" name="name" placeholder="your name"></input>
            <input type="email" name="email" placeholder="your email"></input>
            <input type="text" name="street" placeholder="street"></input>
            <input type="text" name="postal" placeholder="Postal"></input>
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
          </form>);
      }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contactdata</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
