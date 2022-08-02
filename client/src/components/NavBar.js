import React from 'react'
import { NavLink } from 'react-router-dom'
import SearchBar from './SearchBar'
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
            <SearchBar />
            <NavLink to={'/'} >
                Exit
            </NavLink>
        </nav >
    )
}

export default NavBar