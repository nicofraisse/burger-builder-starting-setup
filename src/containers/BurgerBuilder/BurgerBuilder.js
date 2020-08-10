import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger'
import Aux from '../../hoc/Aux'


class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    },
    purchased: false,
    totalPrice: 0
  }

  render() {
    return (
      <Aux>
        <div>Burger</div>
        <Burger ingredients={this.state.ingredients} />
        <div>Build Controls</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;
