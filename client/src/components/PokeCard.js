import React from 'react'

const PokeCard = ({ image, name, type }) => {
    return (
        <div>
            <img src={image} alt="img not found" width="200px" height="250px" />
            <h3 className="name">{name}</h3>
            <h5 className="type">{type}</h5>

        </div>
    )
}

export default PokeCard