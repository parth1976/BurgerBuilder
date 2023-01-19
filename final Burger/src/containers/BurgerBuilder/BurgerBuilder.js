import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/auxlury';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders'; 
import * as action from '../../store/action/index'



class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        purchasing: false,
      
    }

    componentDidMount () {
        console.log(this.props);
        this.props.onInItIngredients();     
    }

    updatePurchaseState ( ingredients ) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
            return sum > 0
    }

    

    purchaseHandler = () => {
        if(this.props.isAunthicated){
            this.setState( { purchasing: true } );
        }
        else{
            this.props.onsetAuthRedircetPath('/checkout')
            this.props.history.push('/auth')
        }
        }

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');
        this.props.onInitPurchase();
        this.props.history.push( '/checkout'); 
    };
    

    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price} 
                        isAuth={this.props.isAunthicated}/>
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings} 
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
      
        // {salad: true, meat: false, ...}
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStatetoProps = (state) =>{
    return{
        ings : state.burgerBulider.ingredients,
        price:state.burgerBulider.totalPrice,
        error: state.burgerBulider.error,
        isAunthicated : state.auth.token !== null
    };
}

const mapDispatchtoProps = dispatch =>{
    return{
        onIngredientAdded:(ingName)=> dispatch(action.addingredient(ingName)),
        onIngredientRemoved:(ingName)=> dispatch(action.removedingredient(ingName)),
        onInItIngredients: ()=> dispatch(action.initIngredients()),
        onInitPurchase: ()=> dispatch(action.purchaseinit()),
        onsetAuthRedircetPath :(path)=> dispatch(action.setAuthRedircetPath(path))
    };
}

export default connect( mapStatetoProps , mapDispatchtoProps ) (withErrorHandler( BurgerBuilder, axios ));