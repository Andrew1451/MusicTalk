import React, { useState } from 'react';
import './Layout.css';
import Logo from '../components/Logo';
import NavBar from '../components/navigation/NavBar';
import SideDrawer from '../components/navigation/SideDrawer';

const Layout = props => {
    const [sideDrawer, setSideDrawer] = useState(false);

    const sideDrawerToggledHandler = () => {
        setSideDrawer(!sideDrawer);
    }

    return (
        <>
            <Logo />
            <NavBar />
            <SideDrawer sideDrawerToggled={sideDrawerToggledHandler} open={sideDrawer} />
            <main>{props.children}</main>
        </>
    )
}

export default Layout;