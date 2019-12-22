import React from "react";
 
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const Burger = props => {
   
  const { ingredients } = props;

  let transformedIngredients = Object.keys(ingredients)
    .map(type => {
      return [...Array(ingredients[type])].map((_, i) => {
        return <BurgerIngredient type={type} key={type + i}></BurgerIngredient>;
      });
    })
    .reduce((pre, curr) => {
      return pre.concat(curr);
    }, []);

  if(transformedIngredients.length ===0){
    transformedIngredients =<p>Please start adding ingredients!</p>
  }
    
  return (
    
      <div className={classes.Burger}>
        <BurgerIngredient type="bread-top"></BurgerIngredient>
        {transformedIngredients}
        <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        <div>{transformedIngredients.length}</div>
      </div>
    
  );
};

export default  Burger ;
