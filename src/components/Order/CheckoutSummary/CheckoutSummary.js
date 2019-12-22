import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hoppe it tastes well.</h1>
      <div style={{ width: "100%", height: "300px", margin: "auto" }}></div>
      <Burger ingredients={props.ingredients}></Burger>
      <Button btnType="Danger" clicked={props.onCheckoutCancel}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.onCheckoutContinue}>
        Continue
      </Button>
    </div>
  );
};

export default CheckoutSummary;
