import React, { Component } from 'react';
import Order from './Order/Order';
import axios from '../../axios-orders.js';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(response => {
        const fetchedOrders = [];
        Object.keys(response.data).forEach((k) => {
          fetchedOrders.push({
            id: k,
            ...response.data[k]
          })
        });
        this.setState({
          orders: fetchedOrders,
          loading: false
        })
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false
        })
      });

  }

  render() {
    const allOrders = this.state.orders.map((order) => {
      return (
        <Order
          key={order.id}
          price={order.price}
          ingredients={order.ingredients}/>
      )
    })

    return (
      <div>
        {allOrders}
      </div>
    )
  }
}

export default withErrorHandler(Orders, axios);
