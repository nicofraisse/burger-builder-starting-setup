import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => (
  <div className={classes.CheckoutSummary}>
    <h1>It tastes well</h1>
    <div style={{width: '100%', margin: 'auto'}}>
      <Burger ingredients={props.ingredients} />
      <Button
        clicked={props.checkoutCancelled}
        btnType="Danger">CANCEL</Button>
      <Button
        clicked={props.checkoutConfirmed}
        btnType="Success">CONTINUE</Button>
    </div>
  </div>
);

export default checkoutSummary;
