import React from 'react'
import defaultImage from '../images/default.png'
import './PokeCard.css'

const PokeCard = ({ image, name, typeOne, }) => {
    return (
        <div className='theCardContainer' >
            <img className='imgCard' src={image} alt={defaultImage} />
            <span className="nameCard">{name}</span>
            <div className='TheTypes' >
                <span className="typeCard">{typeOne[0]}</span>
                <span className="typeCard">{typeOne[1]}</span>
            </div>

        </div>
    )
}

export default PokeCard