import React, { Component } from "react";
import {connect} from 'react-redux'

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import * as actionTypes from '../../../store/actions/actionTypes'
export class ContactData extends Component {
  state = {
    //We can creat a helper method for clean code
    orderForm: { 
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        errorMessage:"Please add your name"
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        errorMessage:"Please add street"
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        value: "",
        validation:{
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false,
        errorMessage:"ZIP Code is 5 digits"
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        errorMessage:"Please add country"
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        value: "",
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        errorMessage:"Please add your mail"
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "fastest",
              displayValue: "Fastest"
            },
            {
              value: "cheapest",
              displayValue: "Cheapest"
            }
          ]
        },
        value:"",
        validation:{},
        valid: true
      }
    },
    formIsValid:false,
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData ={};
    for (const formElementIdentifier in this.state.orderForm) {
      if (this.state.orderForm.hasOwnProperty(formElementIdentifier)) {
          formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        
      }
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    };
    axios
      .post("/orders.json", order)
      .then(res => {
        this.setState({ loading: false, purchasing: false });
        this.props.history.push("/");
      })
      .catch(err => this.setState({ loading: false }));
  };
  checkValidaty(value, rules){
    let isValid = true;
    if(rules.required){
        isValid = value.trim() !=='' && isValid;
    }

    if(rules.minLength){
      isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
}
  inputChangedHandler = (event, inputIdentifier) =>{
    const updatedOrderForm ={
      ...this.state.orderForm 
    }
    const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidaty(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    
    let formIsValid = true;
    for (const inputIdentifier in updatedOrderForm) {
      if (updatedOrderForm.hasOwnProperty(inputIdentifier)) {
          formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        
      }
    }
     
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
  }

  render() {
    const formElementsArray = [];
    for (const key in this.state.orderForm) {
      if (this.state.orderForm.hasOwnProperty(key)) {
        const element = this.state.orderForm[key];
        formElementsArray.push({
          id: key,
          config: element
        });
      }
    }

    let form;
    if (this.state.loading) {
      form = <Spinner />;
    } else {
      form = (
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map(formElement => {
            return (
              <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                errorMessage={formElement.config.errorMessage}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
              ></Input>
            );
          })}
         
          <Button btnType="Success" disabled={!this.state.formIsValid}>
            Order
          </Button>
        </form>
      );
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}
const mapStateToProps = state =>{
  return{
    ings: state.ingredients,
    price: state.totalPrice
  }
}
const mapDispatchToProps = dispatch =>{
  return {
    order:()=>{
      const formData ={};
      for (const formElementIdentifier in this.state.orderForm) {
        if (this.state.orderForm.hasOwnProperty(formElementIdentifier)) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
          
        }
      }
      const order = {
        ingredients: this.props.ings,
        price: this.props.price,
        orderData: formData
      };
      axios
        .post("/orders.json", order)
        .then(res => {
          this.setState({ loading: false, purchasing: false });
          this.props.history.push("/");
          dispatch({type:actionTypes.ORDER_SUCCESS})
        })
        .catch(err => this.setState({ loading: false })); 
    }
  }
}
export default connect(mapStateToProps)(ContactData) ;
