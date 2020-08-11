import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Meat', type: 'meat'},
  {label: 'Cheese', type: 'cheese'},
]

const buildControls = (props) => (
  <div>
    <div className={classes.BuildControls}>
    <p className={classes.PurchasePrice}>Current price: {props.totalPrice.toFixed(2)} $</p>
      {
        controls.map((control) => {
          return <BuildControl
                  key={control.label}
                  label={control.label}
                  added={() => props.ingredientAdded(control.type)}
                  removed={() => props.ingredientRemoved(control.type)}
                  disabled={props.disabledInfo[control.type]}/>
        })
      }
    <button
    className={classes.OrderButton}
    disabled={!props.purchasable}
    onClick={props.click}>
      ORDER NOW
    </button>
    </div>
  </div>
);

export default buildControls;
