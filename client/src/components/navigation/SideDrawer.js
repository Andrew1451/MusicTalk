import React from 'react';
import MenuButton from './MenuButton';
import NavigationList from './NavigationList';
import classes from './SideDrawer.module.css';

const SideDrawer = props => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <>
            <MenuButton clicked={props.sideDrawerToggled} open={props.open} />
            <div className={attachedClasses.join(' ')}>
                <nav>
                    <NavigationList clicked={props.sideDrawerToggled} />
                </nav>
            </div>
        </>
    )
}

export default SideDrawer;