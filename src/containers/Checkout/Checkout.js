import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactForm from './ContactForm/ContactForm';
import { connect } from 'react-redux';

class Checkout extends Component {
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
          ingredients={this.props.ings}
          checkoutConfirmed={this.checkoutConfirmedHandler}
          checkoutCancelled={this.checkoutCancelledHandler} />
        <Route
          path={this.props.match.path + '/contact-form'}
          component={ContactForm} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
  }
};

export default connect(mapStateToProps)(Checkout);
