import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactForm.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactForm extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: '',
        validation: {
          required: true,
          minLength: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your address'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      city: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your city'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your country'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'UPS'},
            {value: 'Slow shipping'},
            {value: 'Canada Post'}
          ]
        },
        value: 'UPS',
        validation: {},
        valid: true,
        touched: false
      }
    },
    loading: false,
    formIsValid: true
  }

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = (value.trim() !== '') && isValid;
    }
    if (rules.minLength) {
      isValid = (value.length >= 5) && isValid;
    }
    console.log('checking if valid...', isValid)
    return isValid;
  }


  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;

    let formIsValid = true;
    for (let i in updatedOrderForm) {
      formIsValid = updatedOrderForm[i].valid && formIsValid;
    }
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  }

  orderHandler = (event) => {
    event.preventDefault()
    this.setState({loading: true});
    const formData = {}
    for (let i in this.state.orderForm) {
      formData[i] = this.state.orderForm[i].value
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
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
    const formElementsArray = []
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    console.log('a')
    console.log(formElementsArray)
    let form = (
      <form onSubmit={this.orderHandler}>
        {
          formElementsArray.map((e) => {
            return (
              <Input
              key={e.id}
              label={e.config.elementConfig.placeholder}
              elementType={e.config.elementType}
              elementConfig={e.config.elementConfig}
              value={e.config.value}
              invalid={!e.config.valid}
              touched={e.config.touched}
              changed={(event) => this.inputChangedHandler(event, e.id)}/>
            );
          })
        }
        <Button
        btnType="Success"
        clicked={this.orderHandler}
        disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(ContactForm);
