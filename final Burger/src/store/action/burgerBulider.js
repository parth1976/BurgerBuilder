import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'
export const addingredient =(name) =>{
    return{
        type:actionTypes.ADD_INGREDIENTS,
        ingredientName : name
    }
}

export const removedingredient =(name) =>{
    return{
        type:actionTypes.REMOVE_INGREDIENTS,
        ingredientName : name
    }
}

export const setingredient =(ingredients)=>{
    return{
        type : actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = ()=>{
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients =()=>{
    return dispatch=>{
        axios.get( 'https://raect-my-burger-58009-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json' )
        .then( response => {
                dispatch(setingredient(response.data))
        } )
        .catch( error => {
                dispatch(fetchIngredientsFailed())} );
    }
}