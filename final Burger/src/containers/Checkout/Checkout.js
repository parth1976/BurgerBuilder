import React, { Component } from 'react';
import { Route , Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace( '/checkout/contact-data' );
    }

    render () {
        let summary =  <Redirect to="/"/> 
        const purchasedRedircet=  this.props.purchased ?<Redirect to = "/"/> : null;
        if(this.props.ings){

              

                summary=(<div>
                    {purchasedRedircet}

                                 <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                    <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}  />
            </div>
                    )
        }

        return summary

    }
}

const mapStatetoprops = state=>{
    return{
        ings : state.burgerBulider.ingredients,
        purchased : state.order.purchased
    }
}



export default connect(mapStatetoprops ) (Checkout);