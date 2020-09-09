import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <NavbarUnAuth />
        </nav>
    )
}

const NavbarUnAuth = () => (
    <ul>
        <li>
            <NavLink to="/" exact>Home</NavLink>
        </li>
        <li>
            <NavLink to="/search" exact>search</NavLink>
        </li>
        <li>
            <NavLink to="/signin" exact>signin</NavLink>
        </li>
        <li>
            <NavLink to="/signup" exact>signup</NavLink>
        </li>
    </ul>

)

export default Navbar
