import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'


function NavBar() {
    return (
        <nav className={'nav'}>
            <NavLink className={'all home'} to={'/home'} >
                Home
            </NavLink >
            <NavLink className={'all create'} to={'/create'} >
                Create Pokemon
            </NavLink>
            <NavLink className={'all exit'} to={'/'} >
                Exit
            </NavLink>
        </nav >
    )
}

export default NavBar