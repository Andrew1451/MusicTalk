import React from 'react';
import NavigationItem from './NavigationItem';

const NavigationList = props => {
    return (
        <ul className={NavigationList} onClick={props.clicked}>
            <NavigationItem link='/'>Home</NavigationItem>
            <NavigationItem link='/profile'>Profile</NavigationItem>
            <NavigationItem link='/sign-up'>SignUp</NavigationItem>
            <NavigationItem link='/sign-in'>SignIn</NavigationItem>
        </ul>
    )
}

export default NavigationList;