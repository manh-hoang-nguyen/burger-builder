import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import Spinner from "../../components/UI/Spinner/Spinner";

export class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  componentDidMount() {
    // const query = new URLSearchParams(this.props.location.search);
    // let price;
    // let ingredients = {};
    // for (let param of query.entries()) {
    //   if (param[0] === "price") {
    //     price = param[1];
    //   } else {
    //     ingredients[param[0]] = +param[1]; // dau + la de thanh number
    //   }
    // }
    // this.setState({ ingredients: ingredients, totalPrice: price });
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let checkoutSummary = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      checkoutSummary = (
        <CheckoutSummary
          ingredients={this.props.ings}
          onCheckoutCancel={this.checkoutCancelHandler}
          onCheckoutContinue={this.checkoutContinueHandler}
        />
      );
    }
    return (
      <div>
        {checkoutSummary}
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
        )} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ings: state.ingredients
  };
};
export default connect(mapStateToProps, null)(Checkout);
