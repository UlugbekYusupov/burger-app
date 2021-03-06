import React, {Component} from 'react'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGRIDIENT_PRICES = {
    salad: 0.8,
    cheese: 0.5,
    meat: 2.1,
    bacon: 1.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 6,
        purchaseable: false,
        purchasing: false,
        loading: false,  
        error: false      
    }

    componentDidMount() {
        axios.get('https://react-my-burger-b71be-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
                console.log(response)
            })
            .catch(error => {
                this.setState({error: true})
            })
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el
        }, 0);
        this.setState({purchaseable: sum>0})
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
        this.updatePurchaseState(updatedIngridients)
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
        this.updatePurchaseState(updatedIngridients)
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {

        this.props.history.push('/checkout')
        const queryParams = []
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathName:'/checkout',
            search:'?' + queryString
        })
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0
        }

        let orderSummary = null
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>

        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingridients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disableInfo={disabledInfo}                    
                        price={this.state.totalPrice}
                        purchasable={this.state.purchaseable}
                        ordered={this.purchaseHandler} /> 
                </Aux>
            );

            orderSummary = 
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        random={this.randomOrderNumber}
                    /> 
        }
            
        if(this.state.loading) {
            orderSummary = <Spinner/>
        }
        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)
