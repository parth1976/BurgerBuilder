import * as actionTypes from '../action/actionTypes'

const intialState = {
    orders:[],
    loading : false,
    purchased: false
};

const reducer = (state = intialState , action) =>{
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_START:
            return{
                ...state,
                loading: true
            }

        case actionTypes.PURCHASE_INIT:
            return{
                ...state,
                purchased:false
            }

        case actionTypes.PURCHASE_BURGER_SUCESS:
            const newOrder = {
                ...action.orderData,
                id : action.orderId

            }
            return {
                ...state,
                loading:false,
                purchased: true,
                orders : state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                loading: false
            };

        case actionTypes.FETCH_ORDER_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ORDER_SUCCESS:
            return{
                ...state,
                orders:action.orders,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer;