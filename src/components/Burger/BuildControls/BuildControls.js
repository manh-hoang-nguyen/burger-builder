import React from "react";

import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" }
];

const BuildControls = props => {
  let buildControls = controls.map((control, i) => {
    return (
      <BuildControl
        added={() => props.ingredientAdded(control.type)}
        removed={() => props.ingredientRemoved(control.type)}
        key={i}
        disabled={props.disabled[control.type]}
        label={control.label}
        type={control.type}
      ></BuildControl>
    );
  });

  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price:<strong>{props.price.toFixed(2)}</strong>{" "}
      </p>
      {buildControls}
      <button onClick={props.ordered} disabled={!props.purchaseable} className={classes.OrderButton}>
        Order now
      </button>
    </div>
  );
};

export default BuildControls;
