import React from 'react';
import { connect } from 'react-redux';
import NavigationItem from './NavigationItem';
import classes from './NavigationList.module.css';

const NavigationList = props => {
    let navigation = (
        <ul className={classes.NavigationList} onClick={props.clicked}>
            <NavigationItem link='/' exact>Home</NavigationItem>
            <NavigationItem link='/sign-up' exact>SignUp</NavigationItem>
            <NavigationItem link='/sign-in' exact>SignIn</NavigationItem>
        </ul>
    );
    if (props.state.isLoggedIn) {
        navigation = (
            <ul className={classes.NavigationList} onClick={props.clicked}>
                <NavigationItem link='/' exact>Home</NavigationItem>
                <NavigationItem link='/profile' exact>Profile</NavigationItem>
                <NavigationItem link='/friends' exact>Friends</NavigationItem>
                <NavigationItem link='/signout' exact>Signout</NavigationItem>
            </ul>
        )
    }
    return navigation
}

const mapStateToProps = state => {
    return {
        state: state
    }
}

export default connect(mapStateToProps)(NavigationList);