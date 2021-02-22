import React, {Component} from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGRIDIENT_PRICES = {
    salad: 0.8,
    cheese: 0.5,
    meat: 2.1,
    bacon: 1.7
}


class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 6
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngridients = {
            ...this.state.ingredients
        }
        updatedIngridients[type] = updatedCount
        const priceAddition = INGRIDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        this.setState({totalPrice: newPrice, ingredients: updatedIngridients})
    }    
    
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if (oldCount <=0) {return}
        const updatedCount = oldCount - 1
        const updatedIngridients = {
            ...this.state.ingredients
        }
        updatedIngridients[type] = updatedCount
        const priceDeduction = INGRIDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction
        this.setState({totalPrice: newPrice, ingredients: updatedIngridients})
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0
        }

        return (
            <Aux>
                <Burger ingridients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disableInfo={disabledInfo}
                    price={this.state.totalPrice}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder
