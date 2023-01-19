import React, { Component } from 'react';
import { Route, Switch , withRouter , Redirect} from 'react-router-dom';
// import Auth from './containers/Auth/Auth';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux';
import * as actions  from'./store/action/index';
import asyncComponent from './hoc/asyancComponent/asyancComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {

  componentDidMount(){
    this.props.onTryautoSignup()
  }

  render () {

    let routes =(
      <Switch>
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
      </Switch>
    );

    if(this.props.isAuthenticated)
    {
      routes=(
        <Switch>
         <Route path="/auth" component={asyncAuth} />
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/orders" component={asyncOrders} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />

      </Switch>
      )
    }
    return (
      <div>
        <Layout>
            {routes}
        </Layout>
      </div>
    );
  }
}

const mapStatetoProps = state =>{
  return{
     isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchtoProps = dispatch =>{
  return{
      onTryautoSignup:()=> dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStatetoProps ,mapDispatchtoProps ) (App));
