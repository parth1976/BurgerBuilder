import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as action from '../../../store/action/index'

class Logout extends Component{

    componentDidMount(){
        this.props.onLogout();

    }

    render(){
        return(
            <Redirect to="/"/>
        );
        
    }
}

const mapDispatchtoProps = dispatch =>{
    return{
        onLogout: ()=> dispatch(action.logOut())
    }
}

export default connect(null , mapDispatchtoProps) (Logout);