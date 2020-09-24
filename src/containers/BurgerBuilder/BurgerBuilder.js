import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Aux/Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchased: false,
    modalShowing: false,
    loading: false
  };

  componentDidMount() {
    // axios.get('https://react-burger-47236.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({
    //       ingredients: response.data
    //     })
    //   })
    //   .catch(err => {
    //     this.setState({error: true})
    //   })
  }

  updatePurchaseState = (ing) => {
    const ingredients = ing
    const sum = Object.keys(ingredients)
            .map(k => ingredients[k])
            .reduce((sum, el) => sum + el, 0);
    return (sum > 0);
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
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] < 1;
    }
    let orderSummary = null

    let burger = this.state.error ? <p>Ingredients can't be loaded.</p> : <Spinner />
    if (this.props.ings) {
      burger =
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabledInfo={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            totalPrice={this.props.price}
            click={this.purchaseHandler}/>
        </Aux>;
      orderSummary =
        <OrderSummary
          totalPrice={this.props.price}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.checkout}
          ingredients={this.props.ings}/>;
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
