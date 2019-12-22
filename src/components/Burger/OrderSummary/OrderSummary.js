import React from 'react'
import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients) 
        .map(key => {
        return <li key={key}> <span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}</li>
        })
    return (
        <React.Fragment>
            <h3>Your Order: {props.price.toFixed(2)}</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.cancel}>Cancel</Button>
            <Button btnType="Success" clicked={props.continue}>Continue</Button>
        </React.Fragment>
    )
}

export default OrderSummary
