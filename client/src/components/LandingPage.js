import React from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'



function LandingPage() {
    return (
        <div className='conta'>
            <div className='content'>
                <h1 className='titulo'>Pokemon APP</h1>
                <Link to='/home'>
                    <button className='button'>
                        <span className='ingresar'>START THE ADVENTURE</span>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default LandingPage