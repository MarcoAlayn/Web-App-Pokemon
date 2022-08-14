import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/NavBar.css'

function NavBar() {
    return (
        <nav className={'nav'}>
            <NavLink to={'/home'} >
                Home
            </NavLink>,
            <NavLink to={'/create'} >
                Create Your Pokemon
            </NavLink>
            <NavLink to={'/'} >
                Exit
            </NavLink>
        </nav >
    )
}

export default NavBar