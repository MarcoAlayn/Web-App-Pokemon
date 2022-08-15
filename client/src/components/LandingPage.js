import React from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'
import pikachu from '../images/pikachu.gif'
import logo from '../images/logo.png'
import amigos from '../images/amigos.png'


function LandingPage() {
    return (
        <div className='conta'>
            <div className='content'>
                <img className='amigos' src={amigos} alt='img not found' />
                <div className='center' >
                    <img className='logo' src={logo} alt='img not found' />
                    <Link to='/home'>
                        <button className='button'>
                            <span className='ingresar'>START THE ADVENTURE</span>
                        </button>
                    </Link>
                </div>
                <div className='image'>
                    <img src={pikachu} alt='img not found' />
                </div>
            </div>
        </div>
    )
}

export default LandingPage