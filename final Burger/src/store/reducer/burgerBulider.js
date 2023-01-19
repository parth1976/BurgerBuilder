import * as actionTypes from '../action/actionTypes'

const intialState = {
    ingredients: null,
    totalPrice: 40,
    error : false,
    building:false
};

const INGREDIENT_PRICES = {
    salad: 10,
    cheese: 15,
    meat: 20,
    bacon: 20
};

const reducer  = (state = intialState , action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENTS:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building:true
            };

            case actionTypes.REMOVE_INGREDIENTS:
                return{
                    ...state,
                    ingredients:{
                        ...state.ingredients,
                        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                    },
                    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]

                };

            case actionTypes.SET_INGREDIENTS:
                return{
                    ...state,
                    ingredients : action.ingredients,
                    totalPrice: 40,
                    error: false,
                    building:false

                };

            case actionTypes.FETCH_INGREDIENTS_FAILED:
                return{
                    ...state,
                    error:true
                }
            default:
                    return state;
        }

    };


export default reducer;