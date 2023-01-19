import axios from 'axios'
import * as actionTypes from './actionTypes'

export const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token , userId) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId:userId    }
}

export const authFail = (error) =>{
    return{
        type: actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logOut = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')

    return{
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthtimeout =(expirationtime)=>{
    return dispatch => {
        setTimeout(()=>{
            dispatch(logOut());
        },expirationtime * 1000)
    }
}

export const auth = (email , password , isSignUp) =>{
    return dispatch =>{
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC3DuStAFAvyqx-Xveigwjx4cmdaYuZGDQ'

            if(!isSignUp){
                url= 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC3DuStAFAvyqx-Xveigwjx4cmdaYuZGDQ'
            }

        axios.post(url,authData)
        .then(res=>{
            console.log(res);
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn*1000)
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId' , res.data.localId)
            dispatch(authSuccess(res.data.idToken, res.data.localId)); 
            dispatch(checkAuthtimeout(res.data.expiresIn))
        }) 
        .catch(err=>{
            console.log(err);
            dispatch(authFail(err.response.data.error))
        })
    
    }
}

export const setAuthRedircetPath = (path)=>{
    return{
        type: actionTypes.SET_AUTH_REDICET_PATH,
        path: path
    }
}

export const authCheckState =()=>{
    return dispatch=>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logOut());
        }
        else{
            const expirationDate=new Date( localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(logOut())
            }else{
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token , userId))
                dispatch(checkAuthtimeout((expirationDate.getTime() - new Date().getTime())/1000))
            }
        }
    }

}