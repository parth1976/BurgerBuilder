import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../../components/UI/input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/action/index'
class ContactData extends Component {
    state = {
      ordreForm:{
                name: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'yourname'
                    },
                    value: '',
                    validaton:{
                        required: true
                    }, 
                    valid : false,
                    touched : false
                },
                street: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Street'
                    },
                    value: '',
                    validaton:{
                        required: true
                    }, 
                    valid : false,
                    touched : false
                },
                zipCode: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Zip Code'
                    },
                    value: '',
                    validaton:{
                        required: true
                    }, 
                    valid : false,
                    touched : false
                },
                country: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Country'
                    },
                    value: '',
                    validaton:{
                        required: true
                    }, 
                    valid : false,
                    touched : false
                },
                email: {
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Email'
                    },
                    value: '',
                    validaton:{
                        required: true
                    }, 
                    valid : false,
                    touched : false
                },
                deliveryMethod: {
                    elementType:'select',
                    elementConfig:{
                       options:[
                        {value:'select' , displayvalue:'select'},

                        {value:'fastest' , displayvalue:'fastest'},
                        
                        {value:'cheepest' , displayvalue:'cheepest'}
                    ]
                    },
                    value: '',
                    validaton:{
                        required: true
                    }, 
                    valid : false,
                    touched : false
                },
      },
        formIsvalid : false,
    }

    checkvalidty(value , rules){
        let isValid = true;
        
        if (rules.required){
            isValid =  value.trim() !== '' && isValid;
        }

        return isValid;
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.ordreForm){
            formData[formElementIdentifier] = this.state.ordreForm[formElementIdentifier].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId

        }

        this.props.onOrderBurger(order , this.props.token);

     
    }

    inputChangehandler=(event , inputIdentifier)=>{
        const UpdatedForm = {
            ...this.state.ordreForm
        }
            const UpdatedFormelement = {
                ...UpdatedForm[inputIdentifier]
            } ;
            UpdatedFormelement.value=  event.target.value;
            UpdatedFormelement.valid=  this.checkvalidty(UpdatedFormelement.value , UpdatedFormelement.validaton);
            UpdatedFormelement.touched = true;
            UpdatedForm[inputIdentifier] = UpdatedFormelement;

            let formIsvalid = true;
            for(let inputIdentifier in UpdatedForm){
                formIsvalid = UpdatedForm[inputIdentifier].valid && formIsvalid
            }

            this.setState({ordreForm:UpdatedForm , formIsvalid: formIsvalid})
          }

    render () {

        const formElementsArray= [];
        for (let key in this.state.ordreForm ){
            formElementsArray.push({
                id:key,
                config:this.state.ordreForm[key]
            });
        }

        let form = ( 
            <form onSubmit={this.orderHandler}>
              
                {formElementsArray.map(formElement=>(
                    <Input
                    key={formElement.id }
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    touched={formElement.config.touched}
                    invalid={ !formElement.config.valid}
                    changed ={(event)=> this.inputChangehandler(event,formElement.id)} required/>
                ))}
                <Button btnType="Success" disabled = {!this.state.formIsvalid} >ORDER</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const  mapstateToProps = state =>{
    return{
        ings : state.burgerBulider.ingredients,
        price : state.burgerBulider.totalPrice,
        loading : state.order.loading, 
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchtoProps = dispatch =>{
    return{
        onOrderBurger: (orderData , token) => dispatch(actions.purchaseBurger(orderData , token))

    }
}

export default connect(mapstateToProps , mapDispatchtoProps) (withErrorHandler( ContactData , axios));