import React, { useState } from 'react';
import Logo from '../components/Logo';
import SideDrawer from '../components/navigation/SideDrawer';

const Layout = props => {
    const [sideDrawer, setSideDrawer] = useState(false);

    const sideDrawerToggledHandler = () => {
        setSideDrawer(!sideDrawer);
    }

    return (
        <>
            <Logo />
            <SideDrawer sideDrawerToggled={sideDrawerToggledHandler} open={sideDrawer} />
            <main>{props.children}</main>
        </>
    )
}

export default Layout;