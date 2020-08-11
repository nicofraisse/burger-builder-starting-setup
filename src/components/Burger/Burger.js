import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css'

const Burger = (props) => {
  let currentBurgerIngredients = Object.keys(props.ingredients).map((ingredient) => {
    return [...Array(props.ingredients[ingredient])].map((_, i) => {
      return <BurgerIngredient type={ingredient} key={ingredient + i} />;
    })
  }).reduce((prevArr, el) => {
    return prevArr.concat(el)
  }, [])
  if (currentBurgerIngredients.length === 0) {
    currentBurgerIngredients = "Please add ingredients!"
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {currentBurgerIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
}

export default Burger;
