import * as actionTypes from '../../store/action/actionTypes'
import { updateObject } from '../utility';

const intialState = {
    token: null,
    userId: null,
    error: null,
    loading : false,
    authRedircatedpath : "/"
};

 const authSucess = (state , action)=>{
    return updateObject(state , {
        token: action.idToken,
        userId: action.userId,
        error:null,
        loading: false
    })
 }; 

 const setAuthRedircetPath = (state , action)=>{
    return updateObject(state,{authRedircatedpath:action.path})
 }

 const authLogout = (state , action)=>{
    return updateObject(state,{token: null , userId:null})
 }

 const authFail = (state , action)=>{
    return updateObject(state, {
        error:action.error,
        loading: false
    })
 }

const reducer = (state= intialState , action)=>{
    switch(action.type){
        case actionTypes.AUTH_START:
            return updateObject(state , {error: null , loading: true});
        case actionTypes.AUTH_SUCCESS: 
        return authSucess(state , action)

        case actionTypes.AUTH_FAIL:
            return authFail(state , action)
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state , action)
        case actionTypes.SET_AUTH_REDICET_PATH:
            return setAuthRedircetPath(state , action)
            default:
                return state;
    }
}

export default reducer ; 