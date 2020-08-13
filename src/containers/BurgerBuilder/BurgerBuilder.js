import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Aux/Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';


const INGREDIENT_PRICES = {
  salad: 0.7,
  meat: 3,
  cheese: 1.25,
  bacon: 1.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    purchasable: false,
    purchased: false,
    totalPrice: 4,
    modalShowing: false,
    loading: false
  }

  componentDidMount() {
    axios.get('https://react-burger-47236.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({
          ingredients: response.data
        })
      })
      .catch(err => {
        this.setState({error: true})
      })
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
    const queryParams = []
    queryParams.push('price=' + this.state.totalPrice);
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    })
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] < 1;
    }
    let orderSummary = null

    let burger = this.state.error ? <p>Ingredients can't be loaded.</p> : <Spinner />
    if (this.state.ingredients) {
      burger =
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            purchasable={this.state.purchasable}
            totalPrice={this.state.totalPrice}
            click={this.purchaseHandler}/>
        </Aux>;
      orderSummary =
        <OrderSummary
          totalPrice={this.state.totalPrice}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.checkout}
          ingredients={this.state.ingredients}/>;
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.modalShowing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
