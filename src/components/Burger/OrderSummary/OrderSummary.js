import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  // This could be a functional component.

  // Here we just want to check if modal updates when we add/remove ingredients
  componentWillUpdate() {
    // console.log("[OrderSummary] Will Update");
  }

  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients)
      .map((ing) => {
        return (
          <li key={ing}>
            <span style={{textTransform: 'capitalize'}}>{ing}: </span>
            {this.props.ingredients[ing]}
          </li>
        );
    });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientsSummary}
        </ul>
        <p>Total price: <b>${this.props.totalPrice.toFixed(2)}</b></p>
        <p>Proceed to checkout?</p>
        <Button btnType='Success' clicked={this.props.purchaseContinue}>
          ORDER
        </Button>
        <Button btnType='Danger' clicked={this.props.purchaseCancel}>
          CANCEL
        </Button>
      </Aux>
    );

  }
};

export default OrderSummary;
