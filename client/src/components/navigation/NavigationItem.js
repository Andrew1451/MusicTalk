import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const NavigationItem = props => {
    return (
        <li className={classes.NavItem}>
            <NavLink to={props.link} >{props.children}</NavLink>
        </li>
    )
}

export default NavigationItem