import React from 'react';
import classes from './NavBar.module.css';
import NavigationList from './NavigationList';

const NavBar = props => {
    return (
        <nav className={classes.NavBar}>
            <NavigationList />
        </nav>
    )
}

export default NavBar