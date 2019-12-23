import React, { Component, Fragment } from "react";
import {connect} from 'react-redux'

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from '../../store/actions/index'

// const INGREDIENT_PRICES = {
//   salad: 0.5,
//   cheese: 0.4,
//   meat: 1.3,
//   bacon: 0.7
// };

export class BurgerBuilder extends Component {
  state = {   
    purchasing: false,
    loading: false
  };

  componentDidMount() {  
    // axios
    //   .get("https://react-my-burger-a2512.firebaseio.com/ingredients.json")
    //   .then(res => {
    //     this.setState({ ingredients: res.data });
    //   });
  }
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0 ;
  }
/*
  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    const newPrice =
      this.state.totalPrice + updatedCount * INGREDIENT_PRICES[type];

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });

    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];

    if (oldCount > 0) {
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
        ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;

      const newPrice =
        this.state.totalPrice - updatedCount * INGREDIENT_PRICES[type];

      this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
      this.updatePurchaseState(updatedIngredients);
    }
  };
*/
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHander = () => {
   
    // const queryParams =[];
    // for(let i in this.state.ingredients){
    //   queryParams.push(encodeURIComponent(i) + "=" +encodeURIComponent(this.state.ingredients[i]))
    // }
    // queryParams.push("price=" + this.props.totalPrice);
    // const querystring = queryParams.join('&');
    // this.props.history.push({
    //   pathname:"/checkout",
    //   search:"?" + querystring
    // });
    this.props.history.push("/checkout");
  };

  purchaseCancelHander = () => {
    this.setState({ purchasing: false });
  };
  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    
    let burger = this.state.error? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (this.props.ings) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ings }></Burger>
          <BuildControls
            ordered={this.purchaseHandler}
            price={this.props.totalPrice}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchaseable={this.updatePurchaseState(this.props.ings)}
          />
        </Fragment>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.totalPrice}
          continue={this.purchaseContinueHander}
          cancel={this.purchaseCancelHander}
          ingredients={this.props.ings}
        />
      );
      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }

    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
      ings: state.ingredients,
      totalPrice: state.totalPrice
  };
}

const mapDispatchToProps = dispatch => {
  return {
      onIngredientAdded: (ingName) =>dispatch(burgerBuilderActions.addIngredient(ingName))  ,
      onIngredientRemoved: (ingName) => dispatch( burgerBuilderActions.removeIngredient(ingName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));
