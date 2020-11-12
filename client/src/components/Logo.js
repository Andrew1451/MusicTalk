import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Logo.module.css';

const Logo = () => {
    return (
        <ul className={classes.Logo}>
            <li>
                <NavLink to='/'>
                    <span className={classes.Accent}>M</span>usic<span className={classes.Accent}>T</span>alk
                </NavLink>
            </li>
        </ul>
    )
}

export default Logo