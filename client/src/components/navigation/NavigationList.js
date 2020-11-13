import React from 'react';
import NavigationItem from './NavigationItem';
import classes from './NavigationList.module.css';

const NavigationList = props => {
    return (
        <ul className={classes.NavigationList} onClick={props.clicked}>
            <NavigationItem link='/' exact>Home</NavigationItem>
            <NavigationItem link='/profile' exact>Profile</NavigationItem>
            <NavigationItem link='/sign-up' exact>SignUp</NavigationItem>
            <NavigationItem link='/sign-in' exact>SignIn</NavigationItem>
        </ul>
    )
}

export default NavigationList;