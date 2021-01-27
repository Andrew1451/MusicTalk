import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const NavigationItem = props => {
    return (
        <li onClick={props.clicked} className={classes.NavItem}>
            <NavLink to={props.link} >{props.children}</NavLink>
        </li>
    )
}

export default NavigationItem