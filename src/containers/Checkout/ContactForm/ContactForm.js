import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactForm.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactForm extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      city: '',
      zipcode: '',
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault()
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Nicolas",
        address: {
          street: "3438 Sesame Street",
          city: "Montreal",
          country: "Canada",
          email: "nicolas@gmail.com"
        }
      },
      shipping: "UPS"
    }
    axios.post('./orders.json', order)
      .then(response => {
        this.setState({loading: false})
      })
      .catch(error => {
      this.setState({loading: false})
      });
    this.props.history.push('/')
  }

  render() {
    let form = <form action="">
        <input type="text" name="Name" placeholder="Your name..."/>
        <input type="email" name="Email" placeholder="Your email..."/>
        <input type="text" name="Street" placeholder="Your street address..."/>
        <input type="text" name="Postal" placeholder="Your postal code..."/>
        <input type="text" name="City" placeholder="Your city..."/>
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactForm}>
        <h4>Enter your contact info</h4>
        {form}
      </div>
    )
  }
}

export default ContactForm;
