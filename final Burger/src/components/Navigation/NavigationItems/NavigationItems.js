import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            { props.isAunthicated ?<NavigationItem link="/orders">Orders</NavigationItem>
            :null}
         {!props.isAunthicated ?
        <NavigationItem link="/auth">Authenticate</NavigationItem>
        :<NavigationItem link="/logout">Logout</NavigationItem>
        }

    </ul>
);

export default navigationItems;