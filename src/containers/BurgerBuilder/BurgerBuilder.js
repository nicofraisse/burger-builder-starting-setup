import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Aux/Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.7,
  meat: 3,
  cheese: 1.25,
  bacon: 1.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    },
    purchasable: false,
    purchased: false,
    totalPrice: 4,
    modalShowing: false
  }

  updatePurchaseState = (ing) => {
    const ingredients = ing
    const sum = Object.keys(ingredients)
            .map(k => ingredients[k])
            .reduce((sum, el) => sum + el, 0);
    this.setState({
      purchasable: sum > 0
    });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount < 1) {

      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    console.log(this.state.ingredients)
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({
      modalShowing: true
    });
  }

  purchaseCancelHandler = () => {
    this.setState({
      modalShowing: false
    });
  }

  checkout = () => {
    alert('Thank you for your purchase! Your item will be delivered soon...');
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] < 1;
    }
    return (
      <Aux>
        <Modal show={this.state.modalShowing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
          totalPrice={this.state.totalPrice}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.checkout}
          ingredients={this.state.ingredients}/>
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
        ingredientAdded={this.addIngredientHandler}
        ingredientRemoved={this.removeIngredientHandler}
        disabledInfo={disabledInfo}
        purchasable={this.state.purchasable}
        totalPrice={this.state.totalPrice}
        click={this.purchaseHandler}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;
