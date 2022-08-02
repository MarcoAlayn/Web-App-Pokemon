import React from 'react'
import "../styles/LandingPage.css"
import { Link } from 'react-router-dom'
// import background from "../images/background.jpg"
//va a terner una imagen de background
//va a tener boton para ir a la home
// importar el css


function LandingPage() {
    return (
        <div className='full'>
            <div className='full_inner'>
                <div className='content'>
                    <h1 className='titulo'>Pokemon APP</h1>
                    <Link to='/home'>
                        <button className='btn'>
                            <span className='ingresar'>START THE ADVENTURE</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LandingPage