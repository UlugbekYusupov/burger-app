import React from 'react'
import styles from './Burger.module.css'
import BurgerIngridient from './BurgerIngridients/BurgerIngridients';

const burger = (props) => {

    let transformedIngridients = Object.keys(props.ingridients)
    .map(igKey => {
        return [...Array(props.ingridients[igKey])].map((_ , i) => {
            return <BurgerIngridient key={igKey + i} type = {igKey}/>
        });
    })
    .reduce((arr,el) => {
        return arr.concat(el)
    }, []);

    if (transformedIngridients.length ===0) {
        transformedIngridients = <p>Please select ingedients you want !</p>
    }
    return (
        <div className={styles.Burger}>
            <BurgerIngridient type="bread-top"/>
            {transformedIngridients}
            <BurgerIngridient type="bread-bottom"/>
        </div>
    )
}

export default burger
