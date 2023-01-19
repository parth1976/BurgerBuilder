import React, { Component }  from "react";
import Input from "../../components/UI/input/Input";
import Button from "../../components/UI/Button/Button";
import classes from './Auth.css'
import * as actions from '../../store/action/index'
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
class Auth  extends Component {
    state = {
        controls :{
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'your email'
                },
                value: '',
                validaton:{
                    required: true,
                    isEmail : true
                }, 
                valid : false,
                touched : false
            },

            passsword: {
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'your password'
                },
                value: '',
                validaton:{
                    required: true,
                    minLength :6                
                }, 
                valid : false,
                touched : false
            }
          
        },
        isSignUp : true
    }

    componentDidMount(){
        if(!this.props.buldingurger && this.props.AuthRedircetPath !=='/'){
            this.props.onsetAuthRedircetPath();
        }
    }

    checkvalidty(value , rules){
        let isValid = true;
        
        if (rules.required){
            isValid =  value.trim() !== '' && isValid;
        }

        if (rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }

        return isValid;
    }

    inputChangehandler=(event , controlName)=>{
        const UpdatedControls = {
            ...this.state.controls,
        
             [controlName] : {
                ...this.state.controls[controlName],
                value : event.target.value,
                valid: this.checkvalidty(event.target.value ,this.state.controls[controlName].validaton ),
                touched: true
            }
        }
        this.setState({controls: UpdatedControls});
        }

        submitHandler = (event) =>{
            event.preventDefault();
            this.props.onAuth(this.state.controls.email.value , this.state.controls.passsword.value , this.state.isSignUp)

        }

        switchAuthhandler =()=>{
            this.setState(prevState=>{
                return{isSignUp: !prevState.isSignUp}
            })
        }

    render(){
        const formElementsArray= [];
        for (let key in this.state.controls ){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement =>(
            <Input
                key = {formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                touched={formElement.config.touched}
                invalid={ !formElement.config.valid}
                changed ={(event)=> this.inputChangehandler(event,formElement.id)} required />

        ));

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;

        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }
        
        let authredircet = null;
        if(this.props.isAunthicated){
            authredircet = <Redirect to={this.props.AuthRedircetPath}/>
        }

        return(
            <div className={classes.ContactData}>
                {authredircet}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                <Button btnType = "Success"> Successs </Button>

                </form>
                <Button 
                clicked={this.switchAuthhandler}
                btnType="Danger">SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        )
    }
}

const mapstateToProps = state=>{
    return{
        loading: state.auth.loading,
        error:state.auth.error,
        isAunthicated: state.auth.token !== null,
        buldingurger : state.burgerBulider.building,
        AuthRedircetPath : state.auth.authRedircatedpath
    }
}

const mapDispatchtoProps = dispatch =>{
    return{
        onAuth:(email , password , isSignUp)=> dispatch(actions.auth(email , password , isSignUp)),
        onsetAuthRedircetPath:()=> dispatch(actions.setAuthRedircetPath())
    }
}

export default connect(mapstateToProps , mapDispatchtoProps ) (Auth);