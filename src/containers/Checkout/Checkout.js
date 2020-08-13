import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactForm from './ContactForm/ContactForm'

class Checkout extends Component {
  state = {
    ingredients: {},
    totalPrice: 0
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;

    for (let i of query.entries()) {
      if (i[0] === 'price') {
        price = i[1];
      } else {
        ingredients[i[0]] = Number.parseInt(i[1], 10);
      }
    }
    this.setState({ingredients: ingredients, totalPrice: price});
  }


  checkoutConfirmedHandler = () => {
    this.props.history.replace('/checkout/contact-form');
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutConfirmed={this.checkoutConfirmedHandler}
          checkoutCancelled={this.checkoutCancelledHandler} />
        <Route
          path={this.props.match.path + '/contact-form'}
          render={(props) => (<ContactForm {...props} ingredients={this.state.ingredients} price={this.state.totalPrice} />)} />
      </div>
    )
  }
}

export default Checkout
