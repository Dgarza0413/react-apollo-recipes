import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <NavbarAuth />
        </nav>
    )
}

const NavbarAuth = () => {
    return (
        <ul>
            <li>
                <NavLink to="/" exact>Home</NavLink>
            </li>
            <li>
                <NavLink to="/search" exact>Search</NavLink>
            </li>
            <li>
                <NavLink to="/recipe/add" exact>Add Recipe</NavLink>
            </li>
            <li>
                <NavLink to="/profile" exact>Profile</NavLink>
            </li>
        </ul>
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
